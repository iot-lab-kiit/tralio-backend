const ApiError = require("../../error/ApiError");


const sendOtp = async (req, res, next) => {
    const email = req.query.email;
    const id = 1;
    const project = "Tralio";
    const Subject = "Tralio Email Verification";
    
    const url = "https://iot-email-service.herokuapp.com/api/v1/send-email";
    const endPoint = 
  
};

module.exports = sendOtp;
