const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    addedFooditems: [],
    image: {
      type: String,
      default:
        "https://icon-library.net/images/icon-for-user/icon-for-user-12.jpg"
    },
    scannedItems: [],
    co2Behaviour: {}
    // Schema.Types.ObjectId from where do we refernce the co2 behaviour?
  },
  {
    timestamps: true
    //timestamps create a createdAt and updatedAt ? how to have timestamp on *scannedItems* only?
  },
  // later features: totalCO2, totalKM, compensationValue
  {
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
