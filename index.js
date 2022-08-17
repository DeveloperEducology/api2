const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const db = require("./models");
const userss = require("./models/User");

const URL = `mongodb+srv://educology:educology123@educology.b5cu0.mongodb.net/Educology?retryWrites=true&w=majority`;
/* 
    Incase you are using mongodb atlas database uncomment below line
    and replace "mongoAtlasUri" with your mongodb atlas uri.
*/
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });



app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/userss", async (req, res) => {
  let userData = await userss.find();
  userData.length;
  console.log(userData);
  res.send(userData);
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
