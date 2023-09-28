"use strict";
const { check } = require("express-validator");
const library = require("../../models/library.js");

module.exports = (app) => {
  try {
    var user = require("../../controllers/user/user.controller.js")(app);
    // console.log(user.register);
    app.post(
      "/user/create",
      [
        check("email", library.capitalize("Email is Required")).not().isEmpty(),
        check("password", library.capitalize("Password is Required")).isLength({
          min: 4,
        }),
      ],
      user.register
    );

    app.get("/user/check", user.getData);
  } catch (err) {
    console.log(`Error occurred routes/user/user.js ${err}`);
  }
};
