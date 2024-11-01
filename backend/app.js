const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
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
const questionSchema = new Schema({
  question: String,
});

// A model is like a Class: the object/function that you can use, to actually create an instance of a
// dog, give it its own name, color (etc. everything that was "determined" in the blueprint).
const QuestionModel = mongoose.model("Question", questionSchema);

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

app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectToDatabase();
});
