const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  firstname: String,
  lastName: String,
  gender: String,
  contact: String,
  email: {
    type: String,
    required: [true],
    unique: true
  },
  password: { type: String, require: true }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userSchema);
