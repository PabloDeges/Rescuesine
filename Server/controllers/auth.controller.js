const bcrypt = require("bcrypt");
const Profile = require("../models/profile.model");

const registierung = async (req,res ) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name: username,
            password: hashedPassword
        }
        const success = await Profile.create(newUser);
        res.status(200).json(success)
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports = {
    registierung
}