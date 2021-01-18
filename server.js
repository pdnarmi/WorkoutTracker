const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

const apiRoutes = require('./routes/apiRoutes');


app.use(apiRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

mongoose.connect(MONGODB_URI);

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
  });
  
  app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
  });
  
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });