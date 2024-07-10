const express = require("express");
const router = express.Router();
const { getUser, saverecipeUser, unsaverecipeUser } = require('../controllers/profile.controller.js');
const { authenticateJWT } = require('../util/authentication.js');

//single profiles
router.get('/', authenticateJWT, getUser)

router.put("/saverecipe", authenticateJWT, saverecipeUser)

router.put("/unsaverecipe", authenticateJWT, unsaverecipeUser)

module.exports = router;