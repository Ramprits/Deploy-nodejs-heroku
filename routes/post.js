var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");
const upload = require("../middleware/file");
const checkAuth = require("../middleware/check-auth");

router.get("/", postController.getPosts);

router.post("/", checkAuth, upload, postController.createPost);

router.delete("/:id", postController.deletePost);

module.exports = router;
