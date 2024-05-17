const mongoose = require("mongoose");
require('dotenv').config();

const dbIngredient = process.env.COLLECTIONINGREDIENT;

const ingredient = mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    group: [
      {
        name: { type: String, required: true }
      }
    ],
    avarageprice: { type: mongoose.Decimal128, required: true }
  }
);


const Ingredient = mongoose.model(dbIngredient, ingredient);

module.exports = Ingredient;