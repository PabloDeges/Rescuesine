const express = require("express");
const router = express.Router();
//const Ingredient = require("../models/ingredient.model.js"); // ja nein?
const {getIngredients,createIngredient} = require('../controllers/ingredient.controller.js');

// Vorsicht Controller sind noch nicht klar definiert
router.get('/', getIngredients);

router.post('/',createIngredient);

module.exports = router;