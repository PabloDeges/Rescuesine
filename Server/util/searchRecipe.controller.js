const Recipe = require("../models/recipe.model");

async function getRecipeIDsByIngredient(ingredientID) {
    try{  
        let recipes = await Recipe.find({ingredients:{$elemMatch: {"name": ingredientID}}});
        let backRecipes = [];
        for(i=0; i<recipes.length;i++){
            backRecipes.push(recipes[i]._id.toString());
        }
        return backRecipes;
    }catch(error){
        return null;
    }
}

async function getAmoutOfIngredientsForRecipe(recipeID) {
    try{  
        let recipe = await Recipe.findById(recipeID);
        return recipe.ingredients.length;
    }catch(error){
        return null;
    }
}

async function getRecipeByID(recipeID) {
    try{  
        let recipe = await Recipe.findById(recipeID);
        return recipe.toString();
    }catch(error){
        return null;
    }
}


module.exports = {
    getRecipeIDsByIngredient,
    getAmoutOfIngredientsForRecipe,
    getRecipeByID,
  };