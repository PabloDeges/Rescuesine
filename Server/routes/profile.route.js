const express = require("express");
const router = express.Router();
const {getUser} = require('../controllers/profile.controller.js');

//single profiles
router.get('/:id',getUser)

router.put("/saverecipe")

module.exports = router;