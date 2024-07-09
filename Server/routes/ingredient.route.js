const express = require("express");
const router = express.Router();
const { getIngredients, getIngredientIdByName } = require('../controllers/ingredient.controller.js');

router.get('/', getIngredients);

router.get('/:name', getIngredientIdByName)

module.exports = router;