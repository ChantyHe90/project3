// instead of import we use require
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  product_name: String,
  code: String,
  foodfromlists: String
});

const Project = mongoose.model("Project", projectSchema);

// same as "export default"
module.exports = Project;
