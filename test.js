require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// as comments: how it is called in the database OpenFoodFact
const foodExtendedSchema = new Schema({
  id: String,
  // generic_name
  ean: Number,
  //called "code"
  //"codes_tags"
  // codes_tags.[0] tells how many characters the code has
  // codes_tags.[1] gives the product code
  ingredients: [String],
  ingredients_hierarchy: [String],
  ingredients_that_may_be_from_palm_oil_tags: [String],
  ingredients_tags: [String],
  ingredients: [String],
  ingredients_from_palm_oil_tags: [String],
  ingredients_original_tags: [String],
  palmoil: { type: Boolean, default: false }
  //   category: String,
  //   image: {
  //     type: String,
  //     default:
  //       "http://pluspng.com/img-png/gruner-apfel-png-die-aktuellesten-stellen-aus-dem-bereich-medical-2008.png"
  //   },
  //   CO2id: String
  // How to refer to other models:
  // project: { type: Schema.Types.ObjectId, ref: "Project" }
});
// Foods
// .
// open_food_facts
const testFood = mongoose.model(
  "open_food_facts",
  foodExtendedSchema,
  "open_food_facts"
);

(async () => {
  await mongoose.connect("mongodb://localhost/Foods");

  const [_, data] = await testFood.find({}).limit(5);
  console.log("Data:");
  console.log(data);

  const clean = {
    ean: data.codes_tags[1],
    ingredients: data.ingredients || data.ingredients_hierarchy
  };
  console.log(clean.ean);
  await mongoose.disconnect();
})();

module.exports = testFood;
