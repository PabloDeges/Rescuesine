const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();

const { getDetailedRecipe, getRecipesMainPage, getSearchedRecipe, createRecipe, checksavedRecipe, getFilteredRecipes, getAllRecipesIdName, getAllMainpageRecipesTemporary } = require('../controllers/recipe.controller.js');
const { authenticateJWT } = require('../util/authentication.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage })

router.get('/', getRecipesMainPage)

router.get('/allrecipesforuserfilter', getAllMainpageRecipesTemporary)

router.get('/all', getAllRecipesIdName)

router.post('/filtered', getFilteredRecipes)

router.get('/searched/:value', getSearchedRecipe)

router.get('/:id', getDetailedRecipe)

router.post('/', authenticateJWT, upload.single("picture"), createRecipe)

router.get('/isfav/:id', authenticateJWT, checksavedRecipe)

module.exports = router