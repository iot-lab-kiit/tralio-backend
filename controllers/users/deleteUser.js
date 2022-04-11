const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const deleteUser = async(req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete({ _id: userId });
        if (!user) {
            next(ApiError.badRequest(`No User with id ${userId} exists`));
            return;
        }
        res.status(200).json({ message: "User deleted successfully", user: user });
    } catch (err) {
        next(ApiError.internalServerError(err.message));
        return;
    }
    next();
};

module.exports = deleteUser;