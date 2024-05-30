const Recipe = require("../models/recipe.model");

const getRecipesMainPage = async (req,res) => {
    try{  
        const values = [
            { $sample: { size: 10 } },
            {
              $project: {
                _id: 1,
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
    /* try{
        
        // Ja hier muss wohl der Algorightums

        res.status(200).json(recipe)
    }catch(error){
        res.status(500).json({ message : error.message})
    } */
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
    createRecipe,
    deleteRecipe,
  };