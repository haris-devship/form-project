const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");

const UserRouter = Router();

UserRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, age, gender, email, password, image } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    bcrypt.hash(password, 6, async function (err, hash) {
      if (err) {
        res.status(400).send({ message: "Something went wrong" });
      }
      const newUser = new UserModel({
        firstName,
        lastName,
        age,
        gender,
        email,
        password: hash,
        image,
      });

      if (newUser) {
        await newUser.save();
        res.status(200).send({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          age: newUser.age,
          gender: newUser.gender,
          email: newUser.email,
          image: newUser.image,
        });
      }
    });
  }
});

module.exports = { UserRouter };
