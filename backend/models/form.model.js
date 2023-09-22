const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  file: {
    type: "string",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "not active"],
    required: true,
  },
});

const FormModel = mongoose.model("Form", formSchema);

module.exports = { FormModel };
