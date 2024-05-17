const Ingredient = require("../models/ingredient.model");

const getIngredients = async (req, res) => {
    /* try {
        const ingredients = await Ingredient.find({});
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } */
};

const createIngredient = async (req, res) => {
    /* try {
      const ingredient = await Ingredient.create(req.body);
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    } */
  };


module.exports = {
    getIngredients,
    createIngredient,
};