const User = require("../models/profile.model");
const Recipe = require("../models/recipe.model");
const Profile = require("../models/profile.model");

const getUser = async (req, res) => {
  try {
    let saves = [];
    let pub = [];
    const id = req.recipecreator._id;
    const user = await User.findById(id, {
      name: 1,
      publishedrecipies: 1,
      savedrecipies: 1,
      joinDate: 1,
    });
    for (obj in user.publishedrecipies) {
      pub.push(await getRecipes(user.publishedrecipies[obj]._id.toString()));
    }
    for (obj in user.savedrecipies) {
      saves.push(await getRecipes(user.savedrecipies[obj]._id.toString()));
    }
    let back = { name: user.name, joinDate: user.joinDate ,  saves, pub };
    res.status(200).json(back);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saverecipeUser = async (req, res) => {
  try {
    const user = await Profile.findOne({
      _id: req.recipecreator._id,
      'savedrecipies._id': req.body.id
    });

    if (user) {
      return res.status(400).json({ message: "Rezept ist bereits gespeichert" });
    }
    await Profile.findByIdAndUpdate(
      req.recipecreator._id,
      {
        $push: { savedrecipies: { _id: req.body.id,  } },
      },
      { new: true }
    );
    res.status(200).json({ message: "Rezept gespeichert" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unsaverecipeUser  = async (req, res) => {
  try {
    const user = await Profile.findOne({
      _id: req.recipecreator._id,
      'savedrecipies._id': req.body.id
    });

    if (!user) {
      return res.status(400).json({ message: "Rezept nicht vorhanden" });
    }
    await Profile.findByIdAndUpdate(
      req.recipecreator._id,
      {
        $pull: { savedrecipies: { _id: req.body.id,  } },
      },
      { new: true }
    );
    res.status(200).json({ message: "Rezept gelöscht" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getRecipes(id) {
  try {
    let user = await Recipe.findById(id, {
      name: 1,
      creatorname: 1,
      pricecategory: 1,
      preparationtime: 1,
      picture: 1,
      "creator.name": 1,
    });
    user.picture = `http://127.0.0.1:3000/image/${user.picture}`;
    return user;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getUser,
  saverecipeUser,
  unsaverecipeUser,
};
