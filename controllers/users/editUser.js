const User = require("../../models/user/userSchema");
const ApiError = require("../../error/ApiError");

const editUser = async(req, res, next) => {
    const { id: userId } = req.params;

    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        next(ApiError.notFound(`No post with id : ${userId}`));
        return;
    }

    res.status(200).json({ user });
};

module.exports = editUser;