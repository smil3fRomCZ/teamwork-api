const UserService = require("../services/UserService");
const ApiErrorMessageFormatter = require("../utilities/ApiErrorMessageFormatter");

exports.getAllUsers = (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Get all users",
    });
  } catch (err) {
    next(err);
  }
};

exports.createNewUser = async (req, res, next) => {
  try {
    const userRegistrationData = req.body;

    if (!userRegistrationData.password || !userRegistrationData.email) {
      next(
        new ApiErrorMessageFormatter("Please provide email or password", 400)
      );
    } else {
      const newUserRegistration =
        UserService.createNewUser(userRegistrationData);
      res.status(200).json({
        status: "success",
        message: "New user created",
        data: newUserRegistration,
      });
    }
  } catch (err) {
    next(err);
  }
};
