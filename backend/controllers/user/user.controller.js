const db = require("../db_adaptor/mongodb");
const { validationResult } = require("express-validator");
const { GetDocument } = require("../db_adaptor/mongodb");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  const router = {};

  router.register = async (req, res) => {
    const { firstName, lastName, age, email, password, image } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Invalid credentials", errors: errors });
    }
    try {
      let CheckUser = await GetDocument("users", { email }, {});

      if (CheckUser.length > 0) {
        return res.json({ response: "Email already exists" });
      }
      if (password) {
        var hashPassword = bcrypt.hashSync(
          password,
          bcrypt.genSaltSync(8),
          null
        );
      }

      const user = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: hashPassword,
        image: image,
      };

      let insert = await db.InsertDocument("users", user);

      res.json({ response: "User created successfully", insert });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to create User" });
    }
  };

  router.getData = (req, res) => {
    res.send("Welcome to the controller!");
  };
  return router;
};
