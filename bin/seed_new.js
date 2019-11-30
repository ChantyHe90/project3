let newFoods = [
  {
    product_name: "Inger",
    code: "4847474747",
    foodfromlists: "tea"
  }
];

let mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const project = require("../models/project");
// will always delete the last one > seeds.js will be up to date
project.deleteMany({}).then(() => {
  console.log("deleted all existing foods");

  project.create(newFoods).then(() => {
    console.log("import done");
    mongoose.disconnect();
  });
});
