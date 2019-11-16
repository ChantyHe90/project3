var express = require("express");
var router = express.Router();

let Project = require("../models/project");
let Food = require("../models/foodExtended");

// /api/projects
router.get("/", function(req, res, next) {
  // we're in express land !! ()
  Project.find({ owner: req.user._id }).then(projects => {
    res.json(projects);
  });
});

// /api/projects/o1i72367458523dasdztr
router.get("/:id", function(req, res, next) {
  Project.findById(req.params.id).then(project => {
    Food.find({ project: project._id }).then(foods => {
      // this can probably be done in a simpler/cleaner way -- please research
      let p = { ...project._doc };
      p.foods = foods;
      res.json(p);
    });
  });
});

// /api/projects
router.post("/", (req, res, next) => {
  console.log("I am here.");

  // { title: 'Abc', description: 'Whatever' }
  Project.create({
    title: req.body.title,
    description: req.body.description,
    owner: req.user._id
  })
    .then(response => {
      // { _id: '1283t2iu3t427g', title: 'Abc', description: 'Whatever' }
      // res.json(response);
      res.json({ message: "project created" });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
