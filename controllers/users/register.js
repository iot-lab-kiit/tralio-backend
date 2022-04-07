const User = require("../../models/user/userSchema");
const bcrypt = require("bcrypt");
const axios = require("axios");
const createJWT = require("../../helpers/createJWT");
const ApiError = require("../../error/ApiError");
const jwt = require("jsonwebtoken");
const { attachCookiesToResponse, userTokenInfo } = require("../../utils");

const register = async (req, res, next) => {
    const userPayload = req.body;

    const { transid, email, otp } = userPayload;
    const emailApiUrl =
        "https://iot-email-service.herokuapp.com/api/v1/verify-email";
    const verifyEmailPayload = {
        email: email,
        otp: otp,
        transid: transid,
    };
    const response = await axios({
        url: emailApiUrl,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: JSON.stringify(verifyEmailPayload),
    });

    if (response.status !== 200) {
        next(ApiError.badRequest("Wrong OTP"));
        return;
    }

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
                const token = createJWT(user);
                const tokenInfo = userTokenInfo(foundUser);
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
