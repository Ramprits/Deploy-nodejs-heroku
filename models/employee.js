const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

module.exports = mongoose.model("employee", employeeSchema);
