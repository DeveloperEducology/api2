const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const db = require("./models");
const userss = require("./models/User");

const Product = require("./models/Product");
const Questions = require("./models/Question");

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

app.post("/add-question", async (req, res) => {
    const question = new Questions();
    question.question = req.body.question;
    question.answer_options[0] = req.body.answer_options[0]; 
    question.answer_options[1] = req.body.answer_options[1]; 
    question.answer_options[2] = req.body.answer_options[2]; 
    question.answer_options[3] = req.body.answer_options[3]; 
    question.category = req.body.category;
    question.type = req.body.type;
    await question.save((err, question) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(question);
      res.send(question);
    }
  });
})



app.get("/questions", async (req, res) => {
  try {
    let questions = await Questions.find();

    if (questions.length > 0) {
      console.log(questions);
      res.send(questions);
    } else {
      res.send({ result: "No questions found" });
    }
  } catch (err) {
    console.log(err);
  }
});



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
