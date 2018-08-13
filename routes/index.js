var express = require("express");
var router = express.Router();
const mongo = require("mongodb");
const assert = require("assert");
const url = "mongodb://localhost:27017/Adventure";

const Employee = require("../models/employee");
/* GET home page. */
router.get("/", function(req, res, next) {
  Employee.find()
    .then(data => {
      res.status(200).json({
        message: "Sucessfully retrived !",
        employees: data
      });
    })
    .catch(err => {
      console.error(err.status);
    });
});

router.post("/", function(req, res, next) {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  employee
    .save()
    .then(data => {
      res.status(201).json({
        message: "Created sucessfully"
      });
    })
    .catch(error => {
      console.error("Unable to save employee >", error);
    });
});

module.exports = router;
