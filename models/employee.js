const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  email: String,
  contact: String,
  image: String,
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("employee", employeeSchema);
