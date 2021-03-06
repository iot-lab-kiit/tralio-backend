const axios = require("axios");
const ApiError = require("../../error/ApiError");
const verifyOtp = async(req, res, next) => {
    const userPayload = req.body;

    const { transid, userEmail, otp } = userPayload;
    const emailApiUrl =
        "https://email-authenticator.herokuapp.com/api/v1/verify-email";
    const verifyEmailPayload = {
        email: userEmail,
        otp: otp,
        transid: transid,
    };
    try {
        const response = await axios({
            url: emailApiUrl,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: JSON.stringify(verifyEmailPayload),
            validateStatus: () => true,
        });
        if (response.status !== 200) {
            next(ApiError.badRequest("Wrong OTP"));
            return;
        }
    } catch (err) {
        // if(err.error.message.status === 400) {
        //     next(ApiError.badRequest("Wrong OTP"));
        //     return;
        // }
        next(ApiError.internalServerError(err));
    }
    next();
};

module.exports = verifyOtp;