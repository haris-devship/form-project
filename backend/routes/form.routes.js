const { Router } = require("express");
const { addForm, getForms } = require("../controllers/form/form.controller");

const FormRouter = Router();

FormRouter.post("/api/addForm", addForm);

FormRouter.get("/api/getForm", getForms);

module.exports = { FormRouter };
