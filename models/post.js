const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: String,
  image: String,
  created: { type: Date, default: Date.now },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "users", require: true }
});

module.exports = mongoose.model("post", postSchema);
