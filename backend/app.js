const express = require("express");
const app = express();
const port = 3000;

const questions = [
  "Is the mind the same as the brain, or do we have souls? ",
  "Can computers think, or fall in love? ",
  "Can computers be creative? ",
  "What is consciousness? ",
  "Can we really know what it feels like to be a bat? ",
  "When you have a toothache, is the pain in your mouth or in your brain? ",
  "What is an emotion? ",
  "Is love just a feeling? ",
  "How is love different from passion or sexual desire? ",
  "Are emotions irrational? ",
  "Which would you rather be - an unhappy human being or a happy dog? ",
  "What is the meaning of life? ",
  "Is happiness the most important purpose in life? ",
  "Is it always better to have more choices? ",
  "Does freewill really exist? ",
  "If there is no freewill, should we punish people at all? ",
  "If God knows what you will do tomorrow, do you still have freewill? ",
  "Does God exist? ",
  "If God exists, why is there so much evil in the world? ",
  "Can God create a stone so heavy that he cannot lift? ",
  "Can there be two almighty Gods? ",
  "Can there be morality without God? ",
  "Is morality relative?  ",
  "Is it objectively wrong to torture innocent babies just for fun? ",
  "What is friendship and why do we need it? ",
];

questions.forEach((question, index) => {
  app.get(`/question/${index}`, (req, res) => {
    res.send(question);
  });
});

app.get("/questions", (req, res) => {
  res.json({ count: questions.length });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
