const Recipe = require("../models/recipe.model");
const Profile = require("../models/profile.model");
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

const getAllMainpageRecipesTemporary = async (req,res) => {
  try{  
      const values = [
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


const getAllRecipesIdName = async (req,res) => {
  try{  
      const values = [
          {
            $project: {
              _id: 1,
              name: 1,
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
        let newFilename = renamePicture(req.file.originalname, req.file.filename);
        let newRecipe = {
          name: req.body.name,
          steps: req.body.steps,
          ingredients: JSON.parse(req.body.ingredients),
          tags: JSON.parse(req.body.tags),
          pricecategory: req.body.pricecategory,
          preparationtime: req.body.preparationtime,
          creator: JSON.parse(req.body.creator),
          creationdate: new Date().toLocaleDateString('de-DE'),
          picture: newFilename
        };
        const success = await Recipe.create(newRecipe);
        //const token  Hier muss der Token aus dem Request abgegriffen werden
        let id = await Profile.find(JSON.parse(Buffer.from(token.split('.')[1],'base64').toString()).username) 
        await Profile.findByIdAndUpdate( 
          id,
          {$push: { publishedrecipies : { _id:success._id , name:success.name}}},
          { new: true }
        )
        res.status(200).json(success)
    }catch(error){
      console.log(error);
        res.status(500).json({ message: error.message });
    }
}

function renamePicture(originalFilename, filename) {
  let zahl = Math.floor(Math.random() * 1000000);
  const newFilename = `${zahl}-${originalFilename}`;
  const oldPath = path.join(__dirname, '../uploads', filename);
  const newPath = path.join(__dirname, '../uploads', newFilename);
  fs.rename(oldPath, newPath, (err) => {});
  return newFilename;
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
    createRecipe,
    deleteRecipe,
    getAllRecipesIdName,
    getAllMainpageRecipesTemporary,
  };