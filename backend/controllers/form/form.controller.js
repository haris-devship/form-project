const { FormModel } = require("../../models/form.model");

module.exports = {
  async addForm(req, res) {
    try {
        const formDataArray = req.body;
      for (const formData of formDataArray) {
        const newForm = new FormModel(formData);
        await newForm.save();
      }
      res.status(200).send({
        message: "Form Added Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Error Adding Form",
      });
    }
  },
};
