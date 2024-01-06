const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

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
});

userSchema.pre("save", async function (next) {
  const providedPassword = this.password;
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(providedPassword, salt);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model("User", userSchema);
