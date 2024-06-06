const Recipe = require("../models/recipe.model");
const { filterRecipes } = require("../util/searchFunctions");
const fs = require('fs');
const path = require('path');

const getRecipesMainPage = async (req,res) => {
    try{  
        const values = [
            { $sample: { size: 10 } },
            {
              $project: {
                _id: 1,
                name: 1,
                creatorname: { $concat: ["$creator.name"] },
                pricecategory: 1,
                preparationtime: 1,
                picture: { $concat: [`${req.protocol}://${req.get('host')}/image/`, "$picture"] },
              },
            },
          ];
          let recipes = await Recipe.aggregate(values);
          res.status(200).json(recipes);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getFilteredRecipes = async (req,res) => {
    try{
        let recipes = await filterRecipes(req.body, req.protocol, req.get('host'));
        res.status(200).json(recipes);
    }catch(error){
        res.status(500).json({ message : error.message})
    }
}

const getAllRecipesNames = async (req,res) => {
  try{
      let recipes = await Recipe.find({}, {name: 1});
      res.status(200).json(recipes);
  }catch(error){
      res.status(500).json({ message : error.message})
  }
}

const getSearchedRecipe = async (req,res) => {
    try{
        const values = 
            {
              $project: {
                _id: 1,
                name: 1,
                creatorname: { $concat: ["$creator.name"] },
                tags: 1
              },
            }
          
        let query =[ { $match: { name: { $regex: req.params.value, $options: "i" } } }, values ];
        let recipe = await Recipe.aggregate(query);
        res.status(200).json(recipe)
    }catch(error){
        res.status(500).json({ message : error.message})
    }
}


const getDetailedRecipe = async (req,res) => {
    try{
        const { id } = req.params
        const recipe = await Recipe.findById(id)
        recipe.picture = `${req.protocol}://${req.get('host')}/image/${recipe.picture}`
        res.status(200).json(recipe)
    }catch(error){
        res.status(500).json({ message : error.message})
    }
}

const createRecipe = async (req,res) => {
    try{
        const originalFilename = req.file.originalname;
        let zahl = Math.floor(Math.random() * 1000000);
        const newFilename = `${zahl}-${originalFilename}`;
        //const recipe = await Recipe.create(req.body);
        const oldPath = path.join(__dirname, '../uploads', req.file.filename);
        const newPath = path.join(__dirname, '../uploads', newFilename);
        fs.rename(oldPath, newPath, (err) => {
          if (err) throw err;
          //res.send(`Datei erfolgreich hochgeladen und umbenannt: ${newFilename}`);
        });
        res.status(200).json("upload")
    }catch(error){
        res.status(500).json({ message: error.message });
    }
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
    getAllRecipesNames,
    createRecipe,
    deleteRecipe,
  };