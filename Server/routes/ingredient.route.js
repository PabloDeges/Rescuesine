const express = require("express");
const router = express.Router();
const {getIngredients,getIngredientIdByName,createIngredient} = require('../controllers/ingredient.controller.js');

router.get('/', getIngredients);

router.get('/:name', getIngredientIdByName)

router.post('/',createIngredient);

module.exports = router;