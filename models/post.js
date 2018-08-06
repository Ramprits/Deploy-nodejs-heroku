const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    name: String,
    email: String,
    body: String,
    image: String,
    createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("post", postSchema);
