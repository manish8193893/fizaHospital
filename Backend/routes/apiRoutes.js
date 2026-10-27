import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import {
    login,
    logout,
    register,
    resetPassword,
    sendResetOtp,
    sendVerifyOtp,
    verifyEmail,
    isAuthenticated,
    validateResetToken,
    fetchAccessPermission,
    refreshAccessToken,
} from '../controllers/authController.js';
import { getUserData } from '../controllers/userController.js';

const apiRouter = express.Router();

apiRouter.post('/Register', register);
apiRouter.post('/Login', login);
apiRouter.post('/Logout', logout);
apiRouter.post('/SendVerifyOtp', userAuth, sendVerifyOtp);
apiRouter.post('/VerifyAccount', userAuth, verifyEmail);
apiRouter.get('/IsAuth', userAuth, isAuthenticated);
apiRouter.post('/ForgotPassword', sendResetOtp);
apiRouter.get('/ValidateResetToken', validateResetToken);
apiRouter.post('/ResetPassword', resetPassword);
apiRouter.get('/FetchAccessPermission', userAuth, fetchAccessPermission);
apiRouter.post('/RefreshAccessToken', refreshAccessToken);
apiRouter.get('/UserData', userAuth, getUserData);

export default apiRouter;
