const express = require("express");
const router = express.Router();
const {getUser,saverecipeUser} = require('../controllers/profile.controller.js');
const { authenticateJWT } = require('../util/authentication.js');

//single profiles
router.get('/:id',getUser)

//router.put("/saverecipe",authenticateJWT,saverecipeUser)

module.exports = router;