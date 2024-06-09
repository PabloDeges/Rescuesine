const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
//const Product = require("../models/recipe.model.js"); // ja nein?
const {getDetailedRecipe, getRecipesMainPage, getSearchedRecipe,createRecipe, deleteRecipe, getFilteredRecipes, getAllRecipesIdName} = require('../controllers/recipe.controller.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage })
// Vorsicht Controller sind noch nicht klar definiert

router.get('/',getRecipesMainPage)

router.get('/all',getAllRecipesIdName)

//Problem mit den Übergabewerten? Kommt wahrscheinlich aufs Format an
router.post('/filtered',getFilteredRecipes)

router.get('/searched/:value',getSearchedRecipe)

router.get('/:id',getDetailedRecipe)

router.post('/',upload.single("picture"),createRecipe)

//router.delete('/:id',deleteRecipe)


module.exports = router