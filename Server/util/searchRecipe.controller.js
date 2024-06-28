const Recipe = require("../models/recipe.model");

async function getRecipeIDsByIngredient(ingredientID) {
    try{  
        let recipes = await Recipe.find({ingredients:{$elemMatch: {"name": ingredientID}}}, {_id: 1});
        let backRecipes = [];
        for(i=0; i<recipes.length;i++){
            backRecipes.push(recipes[i]._id.toString());
        }
        return backRecipes;
    }catch(error){
        return null;
    }
}

async function getRecipeIDsByIngredientAndTag(ingredientID, tag) {
    try{  
        let recipes = await Recipe.find({ingredients:{$elemMatch: {"name": ingredientID}}, tags:{$elemMatch: {"name": {$in: tags}}}}, {_id: 1});
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

async function getRecipeByID(recipeID, protocol, host) {
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
        return recipe[0];
    }catch(error){
        return null;
    }
}

module.exports = {
    getRecipeIDsByIngredient,
    getRecipeIDsByIngredientAndTag,
    getAmoutOfIngredientsForRecipe,
    getRecipeByID,
  };