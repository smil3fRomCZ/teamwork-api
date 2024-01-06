const UserService = require("../services/UserService");
const ApiErrorMessageFormatter = require("../utilities/ApiErrorMessageFormatter");
const userHelper = require("../utilities/userHelpers");

// HELPER METHODS
const isUserIDvalid = (userID, next) => {
  if (!userID) {
    return next(new ApiErrorMessageFormatter("Missing objectID number", 400));
  }
  if (!userHelper.isIdValid(userID)) {
    return next(new ApiErrorMessageFormatter("Invalid user id provided", 400));
  }
  return true;
};

// CONTROLLER

exports.createNewUser = async (req, res, next) => {
  try {
    const userRegistrationData = req.body;
    if (userHelper.isObjectEmpty(userRegistrationData)) {
      return next(
        new ApiErrorMessageFormatter("Pls enter registration data", 400)
      );
    }
    if (!userRegistrationData.password || !userRegistrationData.email) {
      return next(
        new ApiErrorMessageFormatter("Please provide email or password", 400)
      );
    } else {
      const newUserRegistration =
        await UserService.createNewUser(userRegistrationData);
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

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    if (!users) {
      return res.status(200).json({
        status: "success",
        message: "No users in DB",
      });
    }
    res.status(200).json({
      status: "success",
      records: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserByID = async (req, res, next) => {
  try {
    const { userID } = req.params;
    if (isUserIDvalid(userID, next)) {
      const user = await UserService.getUserByID(userID);
      if (!user) {
        return res
          .status(404)
          .json({ status: "not found", message: "No user found" });
      }
      res.status(200).json({ status: "success", data: user });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const userData = req.body;
    if (userData.password) {
      return next(
        new ApiErrorMessageFormatter(
          "Invalid JSON - u cant change password",
          400
        )
      );
    }
    if (isUserIDvalid(userID, next)) {
      await UserService.updateUser(userID, userData);
      res.status(200).json({ status: "success", message: "User was updated" });
    }
  } catch (err) {
    next(err);
  }
};

exports.makeUserInactive = async (req, res, next) => {
  try {
    const { userID } = req.params;
    if (isUserIDvalid(userID, next)) {
      if (await UserService.makeUserInactive(userID)) {
        return res
          .status(200)
          .json({ status: "success", message: "User changed to inactive" });
      } else {
        return res
          .status(404)
          .json({ status: "not found", message: "No user found" });
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userID } = req.params;
    if (isUserIDvalid(userID, next)) {
      if (!(await UserService.getUserByID(userID))) {
        console.log("HIT");
        return res
          .status(404)
          .json({ status: "not found", message: "No user found to delete" });
      }
      await UserService.deleteUser(userID);
      res
        .status(200)
        .json({ status: "success", message: "User permanently deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
