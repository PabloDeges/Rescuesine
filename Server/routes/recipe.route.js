const express = require("express");
const router = express.Router();
//const Product = require("../models/recipe.model.js"); // ja nein?
const {getDetailedRecipe, getRecipesMainPage, getSearchedRecipe,createRecipe, deleteRecipe, getFilteredRecipes} = require('../controllers/recipe.controller.js');



// Vorsicht Controller sind noch nicht klar definiert

router.get('/',getRecipesMainPage)

//Problem mit den Übergabewerten? Kommt wahrscheinlich aufs Format an
router.post('/filtered',getFilteredRecipes)

router.get('/searched/:value',getSearchedRecipe)

router.get('/:id',getDetailedRecipe)

router.post('/',createRecipe)

//router.delete('/:id',deleteRecipe)


module.exports = router