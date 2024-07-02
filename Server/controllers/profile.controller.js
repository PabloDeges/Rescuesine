const User = require("../models/profile.model");
const Recipe = require("../models/recipe.model");

const getUser = async (req, res) => {
  try {
    let saves = [];
    let pub = [];
    const id  = req.recipecreator._id;
    const user = await User.findById(id, {
      name: 1,
      publishedrecipies: 1,
      savedrecipies: 1,
    });
    for (obj in user.publishedrecipies) {
      pub.push(await getRecipes(user.publishedrecipies[obj]._id.toString()));
    }
    for (obj in user.savedrecipies) {
      saves.push(await getRecipes(user.savedrecipies[obj]._id.toString()));
    }
    let back = { name: user.name, saves, pub };
    res.status(200).json(back);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saverecipeUser = async (req,res) => {
  try{
    await Profile.findByIdAndUpdate( 
      req.recipecreator._id,
      {$push: { savedrecipies : { _id:req.id , name:req.name}}},
      { new: true }
    )
    res.status(200).json({message: "Rezept gespeichert"})
  }catch (error){
    res.status(500).json({ message: error.message });
  }
}

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
    console.log(user);
    return user;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getUser,
  saverecipeUser,
};
