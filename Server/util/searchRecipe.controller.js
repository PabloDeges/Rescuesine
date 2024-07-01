const Recipe = require("../models/recipe.model");

async function getRecipeIDsByIngredientAndTag(ingredientID, tags, mode) {
    try{  
        let recipes;
        switch(mode) {
            //keine zutaten oder tags wurden uebergeben
            //es werden zehn zufaellige rezepte aus der db zuruckegegeben
            case 0:
                recipes = await Recipe.aggregate([{ $sample: { size: 10 } }, { $project: {_id: 1}}]);
                break;
            //keine zutaten aber tags wurden uebergeben
            //es werden alle rezepte zurueckgegeben, die alle angegebenen tags enthalten
            case 1:
                recipes = await Recipe.find({tags:{$elemMatch: {"name": {$all: tags}}}}, {_id: 1});
                break;
            //zutaten, aber keine tags wruden uebergeben
            //es werden alle rezepte mit der entsprechenden zutat zurueckgegeben
            case 2:
                recipes = await Recipe.find({ingredients:{$elemMatch: {"name": ingredientID}}}, {_id: 1});
                break;
            //zutaten und tags wruden uebergeben
            //es werden alle rezepte mit der entsprechenden zutat zurueckgegeben, die alle angegebenen tags enthalten
            case 3:
                recipes = await Recipe.find({ingredients:{$elemMatch: {"name": ingredientID}}, tags:{$elemMatch: {"name": {$all: tags}}}}, {_id: 1});
                break;
            //bei einem fall auserhalb der erwarteten faelle wird ein leeres array zurueckgegeben
            default:
                recipes = [];
        }
        
        console.log(recipes);

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
    getRecipeIDsByIngredientAndTag,
    getAmoutOfIngredientsForRecipe,
    getRecipeByID,
  };