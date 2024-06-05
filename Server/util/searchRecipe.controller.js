const Recipe = require("../models/recipe.model");

const protocol = "http";
const host = "127.0.0.1:3000";

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
        let recipe = await Recipe.find({
            "_id": recipeID}, {
                _id: 1,
                name: 1,
                creatorname: {$concat: ["$creator.name"]},
                pricecategory: 1,
                preparationtime: 1,
                picture: { $concat: [`${protocol}://${host}/image/`, "$picture"] }
            });
        console.log(recipe);
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