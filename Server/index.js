require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const recipeRoute = require("./routes/recipe.route.js");
const ingredientRoute = require("./routes/ingredient.route.js");
//const profileRoute = require("./routes/profile.route.js");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const dbloc = process.env.DBLOCATION;
const dbPort = process.env.DBPORT;
const dbName = process.env.DBRECIPE;

app.use(cors());

//Routen
//app.use("/recipe", recipeRoute);
//app.use("/ingredient", ingredientRoute);
//app.use("/profile", profileRoute);




app.get('/', (req, res) => {
  res.send('Hallo Welt!');
});



//Connect to Database at startup
mongoose
  .connect(`mongodb://${dbloc}:${dbPort}/${dbName}`)
  .then(() => {
    console.log("Verbindung mit Datenbank hergestellt");
    app.listen(3000, () => {
      console.log(`Der Server läuft auf http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

