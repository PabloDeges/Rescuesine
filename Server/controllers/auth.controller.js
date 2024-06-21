const bcrypt = require("bcrypt");
const Profile = require("../models/profile.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const KEY = process.env.HASHKEY;
const TOKEN_EXPIRATION_TIME = process.env.EXPIRATION;

const registierung = async (req, res) => {
  try {
    const { username, password } = req.body;
    //console.log( await Profile.findOne({name: username}));
    if(await Profile.findOne({name: username})){
      res.status(500).json({message : "Nutzer schon vorhanden"})
    }else{
      const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: username,
      password: hashedPassword,
    };
    const success = await Profile.create(newUser);
    console.log(success._id.toString())
    res.status(200).json(success);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Profile.findOne({ name: username }, "name password");
    if (
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      const token = jwt.sign({ username }, KEY, {
        expiresIn: TOKEN_EXPIRATION_TIME,
      });
      let a = await Profile.findOne({name : JSON.parse(Buffer.from(token.split('.')[1],'base64').toString()).username})
      console.log(a.name)
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registierung,
  login,
};
