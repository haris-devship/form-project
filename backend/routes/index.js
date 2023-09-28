"use strict";

module.exports = function (app) {
  try {
    var user = require("./users/index")(app);

    app.get("/", function (req, res) {
      res.send("Welcome to the application");
    });
  } catch (err) {
    console.log("Error in index.js-------------->>>", err);
  }
};
