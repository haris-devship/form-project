const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    age: { type: "number", required: true },
    gender: { type: "string", },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    image: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
