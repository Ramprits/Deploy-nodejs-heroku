const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const Employee = require("../models/employee");
const multer = require("multer");

/* GET users listing. */
router.get("/", function(req, res, next) {
  Employee.find()
    .then(response => {
      res.status(200).json({
        message: "Employee fetched data",
        employees: response
      });
    })
    .catch(error => {
      console.error(error);
    });
});

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("/", multer({ storage: storage }).single("image"), function(
  req,
  res,
  next
) {
  const url = req.protocol + "://" + req.get("host");

  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact,
    image: url + "/images/" + req.file.filename,
    createdDate: req.body.createdDate
  });
  // Finally save employee into database
  employee.save().then(res => {
    res.status(201).json({
      message: "Created sucessfully",
      employeeId: res._id
    });
  });
});

router.put("/:id", function(req, res, next) {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact
  });
  Employee.updateOne({ _id: req.params.id }, employee).then(() => {
    res.status(200).json({
      message: "updated sucessfully"
    });
  });
});

router.delete("/:id", function(req, res, next) {
  Employee.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Deleted sucessfully"
    });
  });
});

module.exports = router;
