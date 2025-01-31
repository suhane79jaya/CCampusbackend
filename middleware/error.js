const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === "CastError") {
    const message = `Resources not found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //Mongoose duplicate value
  if (err.code === 11000) {
    const message = "duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }
  //Mongoose Validation error
  if (err.name === "ValidationError") {
    const message = Object.value(err.errors).map((val) => "" + val.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statuscode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};
module.exports = errorHandler;
