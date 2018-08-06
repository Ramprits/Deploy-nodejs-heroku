const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true],
    unique: true
  },
  password: { type: String, require: true }
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model("user", userSchema);
