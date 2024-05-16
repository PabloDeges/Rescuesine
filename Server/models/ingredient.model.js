const mongoose = require("mongoose");

const ingredient = mongoose.Schema(
    {
        //Objectstructure
    }
  );


const Ingredient = mongoose.model("Ingredient", ingredient);

module.exports = Ingredient;