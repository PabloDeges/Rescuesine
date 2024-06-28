const mongoose = require("mongoose");
require('dotenv').config();

const dbProfile = process.env.COLLECTIONUSER;

const profile = mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    publishedrecipies: [
      {
        id: { type: Number, required: false },
        name: { type: String, required: false }
      }
    ],
    savedrecipies: [
      {
        id: { type: Number, required: false },
        name: { type: String, required: false }
      }
    ]
  }
);


const Profile = mongoose.model(dbProfile, profile);

module.exports = Profile;