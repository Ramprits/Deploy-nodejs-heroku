var express = require("express");
var router = express.Router();
const Angular = require("../models/angular");

/* GET users listing. */
router.get("/", function (req, res, next) {
    Angular.find()
        .then(data => {
            res.status(200).json({
                message: "Sucessfully retrived !",
                Angulars: data
            });
        })
        .catch(err => {
            console.error(err.status);
        });
});

router.post("/", function (req, res, next) {
    const Angular = new Angular({
        name: req.body.name,
        content: req.body.content,
        url: req.body.url,
        createdDate: req.body.createdDate
    });
    Angular.save()
        .then(data => {
            res.status(201).json({
                message: "Created sucessfully",
                AngularId: data._id
            });
        })
        .catch(error => {
            console.error("Unable to save Angular >", error);
        });
});


router.delete("/:id", function (req, next) {
    Angular.deleteOne({_id: req.params.id})
        .then(res => {
            console.log(req.params.id);
            res.status(200).json({
                message: "Deleted sucessfully "
            });
        })
        .catch(() => {
            console.log("Unable to delete");
        });
});

module.exports = router;
