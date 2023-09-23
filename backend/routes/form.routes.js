const { Router } = require("express");
const {
  addForm,
  getForms,
  updateForm,
} = require("../controllers/form/form.controller");

const FormRouter = Router();

FormRouter.post("/api/addForm", addForm);

FormRouter.get("/api/getForm", getForms);

FormRouter.put("/api/update/:id", updateForm);

module.exports = { FormRouter };
