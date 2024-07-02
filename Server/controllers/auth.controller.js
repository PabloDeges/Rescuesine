const bcrypt = require("bcrypt");
const Profile = require("../models/profile.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const KEY = process.env.HASHKEY;
const TOKEN_EXPIRATION_TIME = process.env.EXPIRATION;
const jwtHeader = { algorithm: "HS256" };

const registierung = async (req, res,next) => {
  try {
    const { username, password } = req.body;
    console.log( await Profile.findOne({name: username}));
    if (await Profile.findOne({ name: username })) {
      res.status(500).json({ message: "Nutzer schon vorhanden" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name: username,
        password: hashedPassword,
      };
      const success = await Profile.create(newUser);
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let expirationTime = Date.now() / 1000 + parseInt(TOKEN_EXPIRATION_TIME);
    let payload = {
      username: username,
      exp: expirationTime,
    };
    const user = await Profile.findOne({ name: username }, "name password");
    if (user) {
      if (user.password && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(payload, KEY, jwtHeader);
        res.json({ token });
      } else {
        res.status(401).json({ message: "Eingabeparameter sind falsch" });
      }
    }else {
      res.status(401).json({message:"Dieser Nutzer exisitiert nicht"})
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registierung,
  login,
};
