import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.apiError('Not authorized. Login again', 'Unauthorized_401', '', null, 401);
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode && tokenDecode.id) {
            if (!req.body) req.body = {};
            req.body.userId = tokenDecode.id;
            next();
        } else {
            return res.apiError('Not authorized. Login again', 'Unauthorized_401', '', null, 401);
        }
    } catch (error) {
        return res.apiError(error.message, 'Unauthorized_401', '', null, 401);
    }
}

export default userAuth;