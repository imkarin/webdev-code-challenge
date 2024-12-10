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

app.get("/question/:id?", async (req, res) => {
  const questionId = req.params.id;

  if (questionId === undefined) {
    res.status(404).send("Please provide an id");
  }

  const question = await QuestionModel.findById(questionId);

  if (question === undefined) {
    res.status(404).send("No question found with id: " + questionId);
  } else {
    res.send(question);
  }
});

app.get("/questions", async (req, res) => {
  console.log("req.cookies", req.cookies);
  const allQuestions = await getAllDocuments();

  const responseObject = {
    last_updated: new Date("2024-10-10"),
    total_amount: allQuestions.length,
    questions: allQuestions,
  };
  res.send(responseObject);
});

// USER REGISTER DATA STUFF

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

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
        token: token,
      });

      res.json({ message: "Registration Succesful" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  }
});

// USER LOGIN DATA STUFF
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
    return res
      .cookie("jwt", userFromDB.token, {
        maxAge: 600000,
      })
      .status(200)
      .json({ message: "Success" });
  } else {
    res.status(401).json({ message: "Wrong password" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectToDatabase();
});
