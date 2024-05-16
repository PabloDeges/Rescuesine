const mongoose = require("mongoose");

const recipe = mongoose.Schema(
    {
        //Objectstructure
    }
  );


const Recipe = mongoose.model("Recipe", recipe);

module.exports = Recipe;