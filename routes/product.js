var express = require("express");
var router = express.Router();

let Project = require("../models/project");
let Food = require("../models/foodExtended");
let Emission = require("../models/foodFromList");
// /api/product/ean
router.get("/:ean", function(req, res, next) {
  console.log(req.params);
  Food.findOne({ code: req.params.ean }).then(food => {
    let id = food.foodfromlists;

    Emission.findById({ _id: id }).then(result => {
      console.log(result);
      food.emission = result.emission;
      res.json(food);
    });
  });
});

module.exports = router;
