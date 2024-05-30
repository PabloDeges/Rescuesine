const express = require("express");
const router = express.Router();
const {getMainPageImage} = require('../controllers/image.controller.js');

router.get('/:filename', getMainPageImage);

module.exports = router;