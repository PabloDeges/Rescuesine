require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hallo Welt!');
});

app.listen(port, () => {
  console.log(`Der Server läuft auf http://localhost:${port}`);
});
