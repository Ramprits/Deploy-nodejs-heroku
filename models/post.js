const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: String,
  image: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("post", postSchema);
