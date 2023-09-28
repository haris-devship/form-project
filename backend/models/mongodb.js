const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var config_user_schema = require("../Schema/user.schema.js");

var userSchema = mongoose.Schema(config_user_schema.USER, {
  timestamps: true,
  versionKey: false,
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

var users = mongoose.model("users", userSchema, "users");

module.exports = {
  users: users,
};
