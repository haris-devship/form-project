const db = require("../db_adaptor/mongodb");
const { validationResult } = require("express-validator");
const {
  GetDocument,
  UpdateDocument,
  DeleteOneDocument,
} = require("../db_adaptor/mongodb");
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

  router.updateUser = async (req, res) => {
    const { id, firstName, lastName, age, email, image } = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Invalid credentials", errors: errors });
    }
    try {
      let CheckUser = await GetDocument("users", { email }, {});

      if (!CheckUser.length > 0) {
        return res.status(401).send({ message: "User is invalid" });
      }

      const updateUser = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        image: image,
      };

      let update = await UpdateDocument(
        "users",
        { _id: ObjectId(CheckUser._id) },
        updateUser,
        {}
      );

      if (update && update.nModified != 0) {
        res.json({ status: 1, response: "Password update successfully" });
      } else {
        res.json({ status: 0, response: "Password update failed" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to update the user" });
    }
  };

  router.deleteUser = async (req, res) => {
    const { id } = req.body;

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Invalid credentials", errors: errors });
    }

    try {
      const findUser = await GetDocument(
        "users",
        {
          _id: ObjectId(id),
        },
        {}
      );

      if (!findUser) {
        return res.status(401).send({ message: "User is Not Found" });
      }

      const deleteUser = await DeleteOneDocument("users", {
        _id: ObjectId(id),
      });

      if (!deleteUser) {
        return res.status(401).send({ message: "Unable to delete User" });
      }

      res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
      console.log("Error deleting user", err);
      res.status(500).send({ message: "Error deleting user" });
    }
  };

  return router;
};
