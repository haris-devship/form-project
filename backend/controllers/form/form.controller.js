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
  async getForms(req, res) {
    const formData = await FormModel.find();

    if (formData.length < 1) {
      return res.status(404).send({
        message: "No Forms Found",
      });
    }
    try {
      res.status(200).send(formData);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Error Getting Forms",
      });
    }
  },
};
