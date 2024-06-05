require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const recipeRoute = require("./routes/recipe.route.js");
const ingredientRoute = require("./routes/ingredient.route.js");
const profileRoute = require("./routes/profile.route.js");
const imageRoute = require("./routes/images.route.js")
const cors = require("cors");
const app = express();

const port = process.env.PORT;
const dbloc = process.env.DBLOCATION;
const dbPort = process.env.DBPORT;
const dbName = process.env.DBRECIPE;

app.use(cors());
app.use(express.json()) 

//Routen
app.use("/recipe", recipeRoute);
app.use("/ingredient", ingredientRoute);
//app.use("/profile", profileRoute);
app.use("/image",imageRoute);




//Connect to Database at startup
mongoose
  .connect(`mongodb://${dbloc}:${dbPort}/${dbName}`)
  .then(() => {
    const checkSchema = new mongoose.Schema({
      name: String
    });
    const Check = mongoose.model('Check', checkSchema);
    helper(Check);
    app.listen(3000, () => {
      console.log(`Der Server läuft auf http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });


  async function helper(Check){
    const check = await Check.find();
    check[0].name >= 1.2 ? console.log("Verbindung mit Datenbank hergestellt") : (() => { throw new Error("Deine Datenbank ist nicht mehr aktuell. Datenbankdaten neu laden") })();
  }
