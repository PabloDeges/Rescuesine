const express = require("express");
const router = express.Router();
const { registierung } = require('../controllers/auth.controller.js');

//router.post('/login', getIngredients);

router.post('/register', registierung)

module.exports = router;