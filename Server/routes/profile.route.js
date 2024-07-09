const express = require("express");
const router = express.Router();
const { getUser, saverecipeUser, unsaverecipeUser } = require('../controllers/profile.controller.js');
const { authenticateJWT } = require('../util/authentication.js');

//single profiles
router.get('/', authenticateJWT, getUser)

router.post("/saverecipe", authenticateJWT, saverecipeUser)

router.post("/unsaverecipe", authenticateJWT, unsaverecipeUser)

module.exports = router;