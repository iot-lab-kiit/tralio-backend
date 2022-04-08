const User = require("../../models/user/userSchema");
const bcrypt = require("bcrypt");
const ApiError = require("../../error/ApiError");
const { attachCookiesToResponse, userTokenInfo } = require("../../utils");

const register = async (req, res, next) => {
    const userPayload = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        userPayload.userPassword = await bcrypt.hash(
            userPayload.userPassword,
            salt
        );
        const newUser = new User(userPayload);
        newUser
            .save()
            .then((user) => {
                const tokenInfo = userTokenInfo(userPayload);
                attachCookiesToResponse({ res, user: tokenInfo });
                res.status(201).json({
                    message: "User created successfully",
                    user: user,
                });
            })
            .catch((err) => {
                if (err.code === 11000) {
                    next(ApiError.conflict("User already exists."));
                    return;
                }
                next(ApiError.failedDependency(err.message));
                return;
            });
    } catch (err) {
        next(
            ApiError.internalServerError(
                "DB Query Error or Password Encryption Error"
            )
        );
        return;
    }
};

module.exports = register;
