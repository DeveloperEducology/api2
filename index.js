const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const db = require("./models");
const userss = require("./models/User");

const Product = require("./models/Product");
const Questions = require("./models/Question");
const Categories = require("./models/HomeCategory");
const Subjectss = require("./models/SubjectCategory");

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

app.post("/add-category", async (req, res) => {
  const category = new Categories();
  category.title = req.body.title;
  await category.save((err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(category);
      res.send(category);
    }
  });
});

app.get("/categories", async (req, res) => {
  try {
    let cat = await Categories.find();

    if (cat.length > 0) {
      console.log(cat);
      res.send(cat);
    } else {
      res.send({ result: "No categories found" });
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/add-subject", async (req, res) => {
  const subject = new Subjectss();
  subject.categoryIds[0] = req.body.categoryIds[0];
  subject.categoryIds[1] = req.body.categoryIds[1];
  subject.categoryIds[2] = req.body.categoryIds[2];
  subject.title = req.body.title;
  await subject.save((err, subject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(subject);
      res.send(subject);
    }
  });
});


app.get("/subjectss", async (req, res) => {
  try {
    let sub = await Subjectss.find();

    if (sub.length > 0) {
      console.log(sub);
      res.send(sub);
    } else {
      res.send({ result: "No categories found" });
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/add-question", async (req, res) => {
  const question = new Questions();
  question.question = req.body.question;
  question.options[0] = req.body.options[0];
  question.options[1] = req.body.options[1];
  question.options[2] = req.body.options[2];
  question.options[3] = req.body.options[3];
  question.correct_option = req.body.correct_option;
  question.right_answer[0] = req.body.right_answer[0];
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
});

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
