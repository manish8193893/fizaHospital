import userModel from "../models/userModel.js";

export const getUserData = async(req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.apiError('User not found', 'UserNotFound_404', 'userId', null, 404);
        }

        return res.apiSuccess({ name: user.name, isAccountVerified: user.isAccountVerified }, 'User data fetched', 'GetUserData_200');
    } catch (error) {
        return res.apiError(error.message, 'Error_500', '', null, 500);
    }
}