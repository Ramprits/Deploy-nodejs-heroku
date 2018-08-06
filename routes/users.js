const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      console.log(user);
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User sucessfully created !",
            result: result
          });
        })
        .catch(() => {
          res.status(500).json({
            message: "Internal server error !"
          });
        });
    })
    .catch(err => {
      console.error(err);
    });
});

router.post("/login", (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({
          message: "auth failed !"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "auth failed !"
        });
      }
      const token = jsonwebtoken.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "$2b$10$4eYrC9tfsnxnhc0gn5jOa7TqBFa9n4c5CpaqR7te1H1ye2",
        {
          expiresIn: "1h"
        }
      );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({
        message: "auth failed !"
      });
    });
});

module.exports = router;
