const jwt = require("jsonwebtoken");
const User = require("../models/profile.model");
require("dotenv").config();
const KEY = process.env.HASHKEY;
const TOKEN_EXPIRATION_TIME = process.env.EXPIRATION;
const jwtHeader = { algorithm: "HS256" };

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let expirationTime = Date.now() / 1000 + parseInt(TOKEN_EXPIRATION_TIME);

  if (authHeader) {
    try{
      let userCheck = await User.findOne({
        name: jwt.verify(authHeader, KEY, jwtHeader).username,
      });
      if (userCheck !== null) {
        let payload = {
          username: jwt.verify(authHeader, KEY, jwtHeader).username,
          exp: expirationTime,
        };
        const newToken = jwt.sign(payload, KEY, jwtHeader);
        res.setHeader("Authorization", `Bearer ${newToken}`);
        req.newToken = newToken;
        req.user = jwt.verify(authHeader, KEY, jwtHeader).username;
        next();
      } else {
        res.json({ message: "Nutzer nicht erkannt" });
      }
    }catch(error){
      res.status(401).json({ message: "Kein gueltiger Token / Session abgelaufen" });
    }
  } else {
    res.sendStatus(401).json({ message: "Nicht eingeloggt" });
  }
};

module.exports = {
  authenticateJWT,
};
