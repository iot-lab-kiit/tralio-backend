const User = require("../../models/user/userSchema");
const userActivitySchema = require("../../models/user/userActivities");
const errorHandler= require("../../error/errorHandler")

const getAllUser = async (req, res) => 
{
  try 
  {
    let allUser = await User.find({});
    if (!allUser) 
    {
        
        errorHandler(404,"No user found in the Database");
    }
    res.status(200).json({ message:"Sent all the available Users.",allUser });
} catch (err) 
{ 
    errorHandler(400,"Error in searching for user");
  }
};

module.exports = 
{
  getAllUser
};
