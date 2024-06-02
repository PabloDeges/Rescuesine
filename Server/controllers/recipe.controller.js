const Recipe = require("../models/recipe.model");
const path = require('path');

const getRecipesMainPage = async (req,res) => {
    try{  
        let recipes = await Recipe.find({})
        let backRecipes = []
        for(i=0; i<recipes.length;i++){
            let object = {
                id: recipes[i]._id.toString(),
                creatorname: recipes[i].creator.name,
                pricecategory: recipes[i].pricecategory,
                preparationtime: recipes[i].preparationtime,
                picture: `${req.protocol}://${req.get('host')}/image/${recipes[i].picture}`
            }
            backRecipes.push(object);
        }
        res.status(200).json(backRecipes)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getFilteredRecipes = async (req,res) => {
    /* try{
        
        // Ja hier muss wohl der Algorightums

        res.status(200).json(recipe)
    }catch(error){
        res.status(500).json({ message : error.message})
    } */
}

const getSearchedRecipe = async (req,res) => {
    /* try{
        
        // Ja hier muss wohl der Algorightums

        res.status(200).json(recipe)
    }catch(error){
        res.status(500).json({ message : error.message})
    } */
}


const getDetailedRecipe = async (req,res) => {
    /* try{
        const { id } = req.params
        const recipe = await Recipe.findById(id)
        res.status(200).json(recipe)
    }catch(error){
        res.status(500).json({ message : error.message})
    } */
}

async function getRecipeIDsByIngredient(ingredientID) {
    try{  
        let recipes = await Recipe.find({ingredients:{$elemMatch: {"_id": ingredientID}}});
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

const createRecipe = async (req,res) => {
    /* try{
        const recipe = await Recipe.create(req.body);
        res.status(200).json(recipe)
    }catch(error){
        res.status(500).json({ message: error.message });
    } */
}

const deleteRecipe = async (req, res) => {
    /* try {
      const { id } = req.params;
  
      const recipe = await Recipe.findByIdAndDelete(id);
  
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } */
  };


module.exports = {
    getRecipesMainPage,
    getFilteredRecipes,
    getSearchedRecipe,
    getDetailedRecipe,
    getRecipeIDsByIngredient,
    getAmoutOfIngredientsForRecipe,
    createRecipe,
    deleteRecipe,
  };