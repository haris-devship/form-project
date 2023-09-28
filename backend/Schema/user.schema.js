// const mongoose = require("mongoose");
// var { Schema } = require("mongoose");
var USER_SCHEMA = {};

USER_SCHEMA.USER = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
};

module.exports = USER_SCHEMA;
