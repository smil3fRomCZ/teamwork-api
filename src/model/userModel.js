const { randomUUID } = require("crypto");
const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  userRole: {
    type: String,
    default: "user",
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  registrationLink: {
    type: "UUID",
    default: () => randomUUID(),
  },
});

module.exports = mongoose.model("User", userSchema);
