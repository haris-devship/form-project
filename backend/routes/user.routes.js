const { Router } = require("express");

const signUp = require("../controllers/signUp/signUp.controller");

const UserRouter = Router();

//
UserRouter.post("/api/signup", signUp.signup);
// UserRouter.post("/api/signup", signUp.);

module.exports = { UserRouter };
