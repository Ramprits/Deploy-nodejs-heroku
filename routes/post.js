var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");
const upload = require("../middleware/file");

router.get("/", postController.getPosts);

router.post("/", upload, postController.createPost);

router.delete("/:id", postController.deletePost);

module.exports = router;
