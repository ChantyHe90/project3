var express = require("express");
var router = express.Router();

let Project = require("../models/project");
let Food = require("../models/foodExtended");

// /api/product/ean
router.get("/:ean", function(req, res, next) {
  console.log(req.params);
  Food.findOne({ code: req.params.ean }).then(food => {
    console.log(food);
    res.json(food);
  });
});

module.exports = router;
