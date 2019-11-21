// from OpenFoodFacts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// as comments: how it is called in the database OpenFoodFact
const foodExtendedSchema = new Schema({
  product_name: String,
  // generic_name
  code: String
  //called "code"
  //"codes_tags"
  // codes_tags.[0] tells how many characters the code has
  // codes_tags.[1] gives the product code
  // ingredients: [],
  // // ingredients_hierarchy
  // // ingredients_that_may_be_from_palm_oil_tags
  // // ingredients_tags
  // // ingredients
  // // ingredients_from_palm_oil_tags
  // palmoil: { type: Boolean, default: false },
  // category: String,
  // image: {
  //   type: String,
  //   default:
  //     "http://pluspng.com/img-png/gruner-apfel-png-die-aktuellesten-stellen-aus-dem-bereich-medical-2008.png"
  // },
  // CO2id: String
  // How to refer to other models:
  // project: { type: Schema.Types.ObjectId, ref: "Project" }
});

const Food = mongoose.model("open_food_fact", foodExtendedSchema);

module.exports = Food;
