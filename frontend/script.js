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

const answeredQuestions = [];

const questionH2 = document.getElementById("question");

const generateBtn = document.getElementById("new-question");

const submitAnswer = document.getElementById("submit-answer");

const answerField = document.getElementById("answer");

const ul = document.getElementById("answer-list");

let randomSelector = null;

generateBtn.addEventListener("click", generateQuestion);

submitAnswer.addEventListener("click", doSomething);

function generateQuestion() {
  if (randomSelector === null) {
    randomSelector = Math.floor(Math.random() * questions.length);
    questionH2.textContent = questions[randomSelector];
  }
  submitAnswer.disabled = false;
  generateBtn.disabled = true;
}

function doSomething() {
  const question = questions[randomSelector];
  const answer = answerField.value;
  const pair = { question: question, answer: answer };

  answeredQuestions.push(pair);
  questions.splice(randomSelector, 1);
  randomSelector = null;
  console.log(questions);
  ul.innerHTML = " ";
  questionH2.textContent = " Click the button for a new question ";
  submitAnswer.disabled = true;
  generateBtn.disabled = false;

  for (let i = 0; i < answeredQuestions.length; i++) {
    const li = document.createElement("li"); // creates the DOM elements

    const header = document.createElement("h4"); // creates the DOM elements\
    header.textContent = answeredQuestions[i].question; // provide the value to the variable

    const paragraph = document.createElement("p"); // creates the DOM elements
    paragraph.textContent = answeredQuestions[i].answer; // provide the value to the variable

    li.appendChild(header); // makes the h4 a child to the li
    li.appendChild(paragraph); // makes the p a child to the li
    ul.appendChild(li); // makes the li a child to the ul
  }
}

// TO-DO

// Use localStorage to save an array of previously answered questions and their responses.

// When the page loads, check if there are saved answers in local storage and display them in the list.

// Ensure that upon button click, the new question is retrieved, and any existing answers are still visible after a page refresh.
