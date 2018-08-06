var express = require("express");
var router = express.Router();

const Order = require("../models/order");
/* GET users listing. */
router.get("/", function(req, res, next) {
  Order.find()
    .then(response => {
      res.status(200).json({
        message: "Order fetched data",
        Orders: response
      });
    })
    .catch(error => {
      console.error(error);
    });
});

router.post("/", function(req, res, next) {
  const Order = new Order({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    created: req.body.created
  });
  // Finally save Order into database
  Order.save().then(res => {
    res.status(201).json({
      message: "Created sucessfully",
      OrderId: res._id
    });
  });
});

router.put("/:id", function(req, res, next) {
  const Order = new Order({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    created: req.body.created
  });
  Order.updateOne({ _id: req.params.id }, Order).then(() => {
    res.status(200).json({
      message: "updated sucessfully"
    });
  });
});

router.delete("/:id", function(req, res, next) {
  Order.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Deleted sucessfully"
    });
  });
});

module.exports = router;
