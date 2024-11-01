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

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: String,
});

const MyModel = mongoose.model("Question", QuestionSchema);

async function getAllDocuments() {
  // NEW ATTEMPT BUT CONFUSION
  try {
    const documents = await MyModel.find();
    console.log(documents);
    return documents; // This will be an array of documents??
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
}

app.get("/question/:id?", (req, res) => {
  const questionId = req.params.id;

  if (questionId === undefined) {
    res.status(404).send("Please provide an id");
  }

  const question = questions[questionId];

  if (question === undefined) {
    res.status(404).send("No question found with id: " + questionId);
  } else {
    res.send(question);
  }
});

app.get("/questions", (req, res) => {
  const responseObject = {
    questions: questions,
    total_amount: questions.length,
    last_updated: new Date("2024-10-10"),
  };

  res.send(responseObject).send(questionMap);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

// MyModel.find({}, function (err, questions) {
//   let questionMap = {};
//   console.log(questionMap);
//   MyModel.forEach(function (question) {      APPARENTLY DOESN'T WORK ANYMORE AFTER V5 MONGOOSE
//     questionMap[questions._id] = question;
//     console.log(questionMap);
//   });
// });
