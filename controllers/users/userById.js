const User = require("../../models/user/userSchema");
const userActivitySchema = require("../../models/user/userActivities");
const createJWT = require("../../helpers/createJWT");

const userById = async (req, res) => {
  try {
    const userId = req.params.id;
    let singleUser = await User.findOne({ _id: userId });
    if (!singleUser) {
      console.log("user does no exist");
    }
    res.status(200).json({ singleUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error in searching for user",
      error: err,
    });
  }
};

module.exports = {
  userById,
};
