let express = require("express");
let foodsRouter = express.Router();
// let Food = require("../models/foodExtended");

let foodExtended = require("../models/foodExtended");
let User = require("../models/user");

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
  foodExtended.find({ product_name: searchTerm }).then(response => {
    res.json(response);
    console.log("response", response);
    // how to access?
  });
});

// POST /api/foods
foodsRouter.post("/", (req, res, next) => {
  // { project_id : '1i263516253gd5', title: 'Clean the room' }
  console.log("food POST is here");

  // user model:  addedFoodItems: []
  User.findByIdAndUpdate(
    { _id: req.user.id },
    { $push: { addedFooditems: req.body.product_name } },
    { new: true }
  )
    // update foodlist .p
    .then(userObj => {
      console.log("HELLOresponse", userObj.addedFooditems);
      res.json(userObj.addedFooditems);
    });
});

// // delete food for later
// foodsRouter.post("/:food_id/delete", (req, res, next) => {
//   foodFromList
//     .findByIdAndRemove({ _id: req.params.food_id })
//     .then(() => res.redirect("/profile"))
//     .catch(err => next(err));
// });
module.exports = foodsRouter;
