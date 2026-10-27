import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from '../config/emailTemplates.js'
import { sendBrevoEmail } from '../config/brevoEmail.js';

const sendCookieToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.apiError('Name, email and password are required', 'MissingDetails_400', 'name,email,password', null, 400);
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return res.apiError('Invalid field types', 'InvalidType_400', 'name,email,password', null, 400);
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.apiError('User already exists', 'UserExists_409', 'email', null, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        sendCookieToken(res, user._id);

        const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        })[character]);

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        let emailStatus = 'failed';
        try {
            const mailResult = await sendBrevoEmail({
                to: email,
                recipientName: name,
                subject: 'Welcome to Fiza Hospital',
                textContent: `Welcome, ${name}! Your Fiza Hospital account has been created. You can now sign in with ${email}.`,
                htmlContent: WELCOME_EMAIL_TEMPLATE
                    .replaceAll('{{name}}', safeName)
                    .replaceAll('{{email}}', safeEmail),
            });
            emailStatus = mailResult.messageId ? 'accepted' : 'submitted';
        } catch (emailError) {
            const message = emailError instanceof Error ? emailError.message : 'Unknown email delivery error';
            console.error('Account was created, but the welcome email could not be sent:', message);
        }

        const message = emailStatus !== 'failed'
            ? 'User created successfully; welcome email accepted by Brevo.'
            : 'User created successfully, but the welcome email could not be sent. Check the backend mail configuration.';
        return res.apiSuccess({ emailStatus }, message, 'Register_201');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.apiError('Email and password are required', 'MissingDetails_400', 'email,password', null, 400);
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.apiError('Invalid field types', 'InvalidType_400', 'email,password', null, 400);
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.apiError('Invalid email or password', 'InvalidCredentials_401', 'email', null, 401);
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.apiError('Invalid email or password', 'InvalidCredentials_401', 'password', null, 401);
        }

        const accessToken = sendCookieToken(res, user._id);
        const refreshToken = randomUUID();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        const tokenType = 'Bearer';

        return res.apiResponse(1, null, 'LogIn_200', null, {
            accessToken,
            refreshToken,
            expiresAt,
            tokenType,
        });
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.apiSuccess(null, 'Logged out successfully', 'Logout_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.apiError('User not found', 'UserNotFound_404', 'userId', null, 404);
        }

        if (user.isAccountVerified) {
            return res.apiError('Account already verified', 'AccountVerified_400', '', null, 400);
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            html: EMAIL_VERIFY_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', user.email),
        };
        await transporter.sendMail(mailOptions);

        return res.apiSuccess(null, 'OTP has been sent to your email ID.', 'SendVerifyOtp_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.apiError('User ID and OTP are required', 'MissingDetails_400', 'userId,otp', null, 400);
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.apiError('User not found', 'UserNotFound_404', 'userId', null, 404);
        }

        if (user.verifyOtp !== otp) {
            return res.apiError('Invalid OTP', 'InvalidOtp_400', 'otp', null, 400);
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.apiError('OTP expired', 'OtpExpired_400', 'otp', null, 400);
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.apiSuccess(null, 'Email verified successfully', 'VerifyEmail_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.apiSuccess({ authenticated: true }, 'Authenticated', 'IsAuthenticated_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.apiError('Email is required', 'MissingDetails_400', 'email', null, 400);
    }

    if (typeof email !== 'string') {
        return res.apiError('Invalid email type', 'InvalidType_400', 'email', null, 400);
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.apiError('User not found', 'UserNotFound_404', 'email', null, 404);
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            html: PASSWORD_RESET_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', user.email),
        };
        await transporter.sendMail(mailOptions);

        return res.apiSuccess(null, 'OTP has been sent to your email ID.', 'ForgotPassword_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const validateResetToken = async (req, res) => {
    const { email, otp } = req.query;

    if (!email || !otp) {
        return res.apiError('Email and OTP are required', 'MissingDetails_400', 'email,otp', null, 400);
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.apiError('User not found', 'UserNotFound_404', 'email', null, 404);
        }

        if (user.resetOtp !== otp) {
            return res.apiError('Invalid OTP', 'InvalidOtp_400', 'otp', null, 400);
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.apiError('OTP expired', 'OtpExpired_400', 'otp', null, 400);
        }

        return res.apiSuccess({ valid: true }, 'Reset token is valid', 'ValidateResetToken_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.apiError('Email, OTP and new password are required', 'MissingDetails_400', 'email,otp,newPassword', null, 400);
    }

    if (typeof email !== 'string' || typeof otp !== 'string' || typeof newPassword !== 'string') {
        return res.apiError('Invalid field types', 'InvalidType_400', 'email,otp,newPassword', null, 400);
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.apiError('User not found', 'UserNotFound_404', 'email', null, 404);
        }

        if (user.resetOtp !== otp) {
            return res.apiError('Invalid OTP', 'InvalidOtp_400', 'otp', null, 400);
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.apiError('OTP expired', 'OtpExpired_400', 'otp', null, 400);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();

        return res.apiSuccess(null, 'Password has been reset successfully', 'ResetPassword_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const fetchAccessPermission = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.apiError('User not found', 'UserNotFound_404', 'userId', null, 404);
        }

        const permissions = [];
        return res.apiSuccess({ userId: user._id, name: user.name, email: user.email, permissions }, 'Access permissions fetched', 'FetchAccessPermission_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}

export const refreshAccessToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.apiError('Token not found', 'TokenMissing_401', '', null, 401);
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (!tokenDecode?.id) {
            return res.apiError('Invalid token', 'InvalidToken_401', '', null, 401);
        }

        sendCookieToken(res, tokenDecode.id);
        const refreshedToken = jwt.sign({ id: tokenDecode.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.apiSuccess({ token: refreshedToken }, 'Access token refreshed', 'RefreshAccessToken_200');
        } catch (error) {
            return res.apiError(error.message, 'InvalidToken_401', '', null, 401);
        }
}
