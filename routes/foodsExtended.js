let express = require("express");
let foodsRouter = express.Router();
let Food = require("../models/foodExtended");
let foodFromList = require("../models/foodFromList");

// // GET api/foods
// foodsRouter.get("/foods", function(req, res, next) {
//   Food.find()
//     .populate("project")
//     .then(response => {
//       res.json(response);
//     });
// });

// GET /api/foods?searchTerm=butter
foodsRouter.get("/", function(req, res, next) {
  let searchTerm = req.query.searchTerm;
  // postman: testbeispiel localhost:5555/api/foods?searchTerm=olive_oil
  foodFromList.find({ name: searchTerm }).then(response => {
    res.json(response);
  });
});

// POST /api/foods
foodsRouter.post("/foods", (req, res, next) => {
  // { project_id : '1i263516253gd5', title: 'Clean the room' }

  Food.create({
    project: req.body.project_id,
    title: req.body.title
  }).then(response => {
    res.json(response);
  });
});

// delete food for later
foodsRouter.post("/:food_id/delete", (req, res, next) => {
  foodFromList
    .findByIdAndRemove({ _id: req.params.food_id })
    .then(() => res.redirect("/profile"))
    .catch(err => next(err));
});
module.exports = foodsRouter;
