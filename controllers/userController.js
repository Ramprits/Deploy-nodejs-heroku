const Post = require("../models/post");

exports.getPosts = function(req, res) {
  Post.find()
    .then(data => {
      res.status(200).json({
        message: "Sucessfully retrived !",
        posts: data
      });
    })
    .catch(err => {
      console.error(err.status);
    });
};

exports.createPost = function(req, res, next) {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    name: req.body.name,
    email: req.body.email,
    body: req.body.body,
    image: url + "/images/" + req.file.filename,
    createdDate: req.body.createdDate
  });
  console.log(post);
  post
    .save()
    .then(data => {
      res.status(201).json({
        message: "Ceated sucessfully",
        postId: data._id
      });
    })
    .catch(error => {
      console.error("Unable to save post", error);
    });
};

exports.deletePost = function(req, res, next) {
  Post.deleteOne({ _id: req.params.id })
    .then(res => {
      console.log(req.params.id);
      res.status(200).json({
        message: "Deleted sucessfully "
      });
    })
    .catch(() => {
      console.log("Unable to delete");
    });
};
