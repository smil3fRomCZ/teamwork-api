const User = require("../model/userModel");

class UserService {
  // Create new user registration
  static createNewUser = async (userRegistrationData) => {
    return await User.create(userRegistrationData);
  };

  // Get all users from db / NULL
  static getAllUsers = async () => {
    const users = await User.find(
      { isActive: true },
      "firstName lastName email userRole"
    );
    if (users.length === 0) return null;
    return users;
  };

  // Get user by ID
  static getUserByID = async (userId) => {
    return await User.findById(userId, "firstName lastName email userRole");
  };

  // Make user inactive
  static makeUserInactive = async (userID) => {
    const user = await User.findById(userID);
    if (!user) {
      return null;
    }
    user.isActive = false;
    user.save();
    return true;
  };

  // Update user
  static updateUser = async (userID, userData) => {
    await User.findByIdAndUpdate(userID, userData, {
      runValidators: true,
      new: true,
    });
  };

  // Delete user permanently
  static deleteUser = async (userID) => await User.findByIdAndDelete(userID);
}

module.exports = UserService;
