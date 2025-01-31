const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

// exports.signin = (req, res) => {
//   res.send("Hello form Signin");
// };
exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse("E-mail already registered", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      Success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
//api for signin
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next(new ErrorResponse("Please add an email", 403));
    }
    if (!password) {
      return next(new ErrorResponse("Please add an password", 403));
    }
    //Check user email

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invaild Credentials", 400));
    }
    //Check Password
    const isMatched = user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Please add an password", 400));
    }
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};
const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({ success: true, token, user });
};
// Api for logout
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};
