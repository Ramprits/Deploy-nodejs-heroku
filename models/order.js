const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: String,
  image: String,
  price: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("order", orderSchema);
