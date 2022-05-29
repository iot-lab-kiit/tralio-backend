const axios = require("axios");
const ApiError = require("../../error/ApiError");

const sendOtp = async (req, res, next) => {
    
    const id = 1;
    const project = "Tralio";
    const email = req.query.email;
    const subject = "Tralio Email Verification";
    
    const emailApiUrl = "https://email-authenticator.herokuapp.com/api/v1/send-email";

    if(!email) {
        next(ApiError.badRequest("Email Missing"));
        return
    }
    const payload = {
        id: id,
        project: project,
        email: email,
        subject: subject
    }

    const response = await axios({
    url:emailApiUrl,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(payload)
  });
  if (response.status == 200) {
      const {transid} = await response.data;
        
      res.status(200).json({email: email, message:"OTP sent successfully", transid:transid});
  }
  else {
      next(ApiError.internalServerError("Email API Failed to send OTP"));
  }
  
};

module.exports = sendOtp;
