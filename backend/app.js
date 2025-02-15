const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const port = 3000;
const uri = process.env.URI;
const tokenSignature = process.env.SECRET_PASSWORD;

// Middleware Configuration
app.use(cors({ credentials: true, origin: "http://localhost:5500" }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cookieParser());

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectToDatabase() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB!");
  } catch (e) {
    // Ensures that the client will close when you finish/error
    console.error(e);
  }
}

const Schema = mongoose.Schema;

// Schema is like a blueprint: what properties does a Question have?
// Example of "Dog" schema: a dog has a name, age, color, etc.
const QuestionSchema = new Schema({
  question: String,
});

// A model is like a Class: the object/function that you can use, to actually create an instance of a
// dog, give it its own name, color (etc. everything that was "determined" in the blueprint).
const QuestionModel = mongoose.model("Question", QuestionSchema);

async function getAllDocuments() {
  try {
    const documents = await QuestionModel.find();
    return documents; // This will be an array of documents??
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
}

// Get all questions
app.get("/questions", async (req, res) => {
  // If no jwt token cookie, send redirect-to-login-page response:
  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ message: "Not logged in" });
  }

  // Otherwise, get questions from database and send those to FE:
  const allQuestions = await getAllDocuments();

  const userAnsweredQuestionsFromDB = []; // TO DO get this from the user schema in the DB
  // So something like: = await UserModel.findOne(...user id here...).answeredQuestions

  const responseObject = {
    last_updated: new Date("2024-10-10"),
    total_amount: allQuestions.length,
    answeredQuestions: userAnsweredQuestionsFromDB,
  };
  res.send(responseObject);
});

// Get single question
app.get("/question", async (req, res) => {
  // We no longer receive a random ID from the FE here.
  // TO DO Instead, we will:
  // 1. Check the user's answered questions in the DB, take those ids
  // 2. Find a new question in the DB, exclude these^ ids

  // Right now, this always returns the same question:
  const question = await QuestionModel.findOne();

  if (question === undefined) {
    res.status(404).send("No question found");
  } else {
    res.send(question);
  }
});

// USER REGISTRATION
const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  answers: { type: Array, required: true, default: [] },
});

const UserModel = mongoose.model("User", UserSchema);

// Save answer to question
app.put("/save-answer", async (req, res) => {
  const username = jwt.verify(req.cookies.jwt, tokenSignature).username;
  try {
    const dbRes = await UserModel.findOneAndUpdate(
      { username: username },
      { $push: { answers: req.body } },
      { new: true }
    );

    if (dbRes) {
      res.send({ message: "Saved", updatedAnswers: dbRes.answers });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed." });
  }
});

app.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const checkIfUserExists = await UserModel.findOne({ username: username });

  if (checkIfUserExists) {
    return res.json({ message: "Username already taken" });
  } else {
    try {
      const token = jwt.sign({ username: username }, tokenSignature);

      await UserModel.create({
        username: username,
        password: hashedPassword,
      });

      res.json({ message: "Registration Succesful" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  }
});

// USER LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userFromDB = await UserModel.findOne({ username: username });

  // User doesn't exist
  if (!userFromDB) {
    res.status(401).json({ message: "User doesn't exist" });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, userFromDB.password);
  if (passwordMatch) {
    const token = jwt.sign(
      {
        username: userFromDB.username,
      },
      tokenSignature
    );
    res.cookie("jwt", token, {
      MaxAge: 60000,
      httpOnly: true,
    });

    res.status(200).json({ message: "Success!" });
  } else {
    res.status(401).json({ message: "Wrong password" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectToDatabase();
});
