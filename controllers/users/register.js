const User = require("../../models/user/userSchema");
const bcrypt = require("bcrypt");
const createJWT = require("../../helpers/createJWT");
const ApiError = require("../../error/ApiError");

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
        const token = createJWT(user);
        res.status(201).json({
          message: "User created successfully",
          user: user,
          token: token,
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
