const { isValidObjectId } = require("mongoose");

// Check if object is empty or not
exports.isObjectEmpty = (obj) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

// Check if string os valid objectID for mongo
exports.isIdValid = (userID) => isValidObjectId(userID);
