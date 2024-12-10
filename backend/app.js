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
app.use(cors());

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
  console.log("question", question);

  if (question === undefined) {
    res.status(404).send("No question found with id: " + questionId);
  } else {
    res.send(question);
  }
});

app.get("/questions", async (req, res) => {
  const allQuestions = await getAllDocuments();

  const responseObject = {
    last_updated: new Date("2024-10-10"),
    total_amount: allQuestions.length,
    questions: allQuestions,
  };
  res.send(responseObject);
});

// USER REGISTER DATA STUFF

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cookieParser());

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);

app.post("/register", async (req, res, next) => {
  console.log(mongoose.connection.readyState);

  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    const check = await Collection.findOne({ name: req.body.name });
    if (check) {
      // Not sure if this should get in the login section or the register section
    } else {
      const token = jwt.sign({ name: req.body.name }, "LONGSTRINGHERE");

      const data = {
        name: req.body.name,
        password: await hashedPassword(req.body.password),
        token: token,
      };

      console.log(data);

      await Collection.insertMany([UserSchema]);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }

  res.json({ message: "Registration Succesful" });
});

// USER LOGIN DATA STUFF

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // const userFromDB = ;  GET USER FROM DATABASE BY USERNAME

  console.log(userFromDB);

  if (!userFromDB) {
    // ADD RES SEND FOR FAILURE
  }

  const passwordMatch = await bcrypt.compare(password, userFromDB);
  if (passwordMatch) {
    // ADD res.cookie
    // ADD const token=jwt...
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectToDatabase();
});
