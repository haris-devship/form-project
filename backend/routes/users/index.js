"use strict";

module.exports = function (app) {
  try {
    var user = require("./user")(app);
    console.log("index / user is working fine");
  } catch (err) {
    console.log("error in admin index.js---------->>>>", err);
  }
};
