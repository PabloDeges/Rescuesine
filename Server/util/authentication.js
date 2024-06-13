const jwt = require("jsonwebtoken");
require("dotenv").config();
const KEY = process.env.HASHKEY;
const TOKEN_EXPIRATION_TIME = "1h";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const newToken = jwt.sign({ username: user.username }, KEY, {
        expiresIn: TOKEN_EXPIRATION_TIME,
      });
      res.setHeader("Authorization", `Bearer ${newToken}`);
      req.newToken = newToken;
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJWT,
};
