const mongoose = require("mongoose");
require('dotenv').config();

const dbRecipe = process.env.COLLECTIONRECIPE;

const recipe = mongoose.Schema(
  {
    name: { type: String, required: true },
    steps: { type: String, required: true },
    ingredients: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        amount: { type: String, required: true }
      }
    ],
    tags: [
      {
        name: { type: String, required: true }
      }
    ],
    pricecatergory: { type: String, required: true },
    preparationtime: { type: String, required: true },
    creator: {
      id: { type: Number, required: true },
      name: { type: String, required: true }
    },
    creationdate: { type: String, required: true },
    picture: { type: String, required: true }
  }
);


const Recipe = mongoose.model(dbRecipe, recipe);

module.exports = Recipe;