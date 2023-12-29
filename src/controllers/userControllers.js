const ApiErrorMessageFormatter = require('../utilities/ApiErrorMessageFormatter');

exports.getAllUsers = (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Get all users',
    });
  } catch (err) {
    next(new ApiErrorMessageFormatter(err.message, err.statusCode));
  }
};
