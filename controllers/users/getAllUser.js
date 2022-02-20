const User = require("../../models/user/userSchema");
const userActivitySchema = require("../../models/user/userActivities");
const createJWT = require("../../helpers/createJWT");

const getAllUser = async (req, res) => 
{
  try 
  {
    let allUser = await User.find({});
    if (!allUser) 
    {
        console.log("No Users available in the Database")
        res.status(204).json({ msg: "No user found in the Database" });
    }
    res.status(200).json({ allUser });
} catch (err) 
{
    console.log(err);
    res.status(400).json(
    {
      message: "Error in searching for user",
      error: err,
    });
  }
};

module.exports = 
{
  getAllUser
};
