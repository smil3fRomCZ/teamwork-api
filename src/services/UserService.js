const User = require("../model/userModel");

class UserService {
  static createNewUser = async (userRegistrationData) => {
    return await User.create(userRegistrationData);
  };
}

module.exports = UserService;
