const express = require("express");
const router = express.Router();
const {getUser} = require('../controllers/profile.controller.js');

//single profiles
router.get('/:id',getUser)


module.exports = router;