const User = require("../../models/user/userSchema");
const bcrypt = require("bcrypt");
const createJWT = require("../../helpers/createJWT");
const ApiError = require("../../error/ApiError");

const register = async (req, res, next) => {
  const { username, userEmail } = req.body;
  const userPayload = req.body;

  if (!username || !userEmail) {
    next(ApiError.badRequest("Either username or email is missing"));
    return;
  }

  try {
    const findUser = await User.findOne({
      $or: [{ username: username }, { userEmail: userEmail }],
    }).then();
    if (findUser != null) {
      next(ApiError.conflict("User already exists"));
      return;
    }
  } catch (err) {
    next(ApiError.internalServerError("Database Query Error"));
    return;
  }

  const salt = await bcrypt.genSalt(10);
  userPayload.userPassword = await bcrypt.hash(userPayload.userPassword, salt);
  const newUser = new User(userPayload);
  newUser
    .save()
    .then((user) => {
      const token = createJWT(user);
      res.status(201).json({
        message: "User created successfully",
        user: user,
        token: token,
      });
    })
    .catch((err) => {
      next(ApiError.failedDependency("Error while creating user"));
      return;
    });
  next();
};

module.exports = { register };
