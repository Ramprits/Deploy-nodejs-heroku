const mongoose = require("mongoose");

const angularSchema = mongoose.Schema({
  name: String,
  content: String,
  url: String,
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("angular", angularSchema);
