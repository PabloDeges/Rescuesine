const express = require("express");
const router = express.Router();
const { registierung, login } = require("../controllers/auth.controller.js");

router.post("/register", registierung);

router.post("/login", login);

module.exports = router;
