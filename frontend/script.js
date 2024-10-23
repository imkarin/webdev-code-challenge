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

const storedList = [];

const storedAnsweredQuestions = JSON.parse(
  localStorage.getItem("answeredQuestions")
);

console.log(storedAnsweredQuestions);

const questionH2 = document.getElementById("question");

const generateBtn = document.getElementById("new-question");

const submitBtn = document.getElementById("submit-answer");

const answerField = document.getElementById("answer");

const ul = document.getElementById("answer-list");

let randomSelector = null;

window.onload = function getStoredList() {
  storedList = JSON.parse(localStorage.getItem("answeredQuestions"));
  if (storedAnsweredQuestions !== null) {
    // Copies code from submit for loop
    const li = document.createElement("li"); // create DOM element

    const header = document.createElement("h4"); // create DOM element
    header.textContent = storedAnsweredQuestions.question; // provide value to Variable

    const paragraph = document.createElement("p"); // create DOM element
    paragraph.textContent = storedAnsweredQuestions.answer; // provide value to variable

    li.appendChild(header); // make h4 a child to li
    li.appendChild(paragraph); // make p a child to li
    ul.appendChild(li); // make li a child to ul
  }
};

generateBtn.addEventListener("click", generateQuestion);

submitBtn.addEventListener("click", submitAnswer);

function generateQuestion() {
  if (randomSelector === null) {
    randomSelector = Math.floor(Math.random() * questions.length);
    questionH2.textContent = questions[randomSelector];
  }
  submitBtn.disabled = false;
  generateBtn.disabled = true;
}

function submitAnswer() {
  const question = questions[randomSelector];
  const answer = answerField.value;
  const pair = { question: question, answer: answer };

  answeredQuestions.push(pair);
  questions.splice(randomSelector, 1);
  randomSelector = null;
  console.log(questions);
  ul.innerHTML = " ";
  questionH2.textContent = " Click the button for a new question ";
  submitBtn.disabled = true;
  generateBtn.disabled = false;

  for (let i = 0; i < answeredQuestions.length; i++) {
    const li = document.createElement("li"); // create DOM element

    const header = document.createElement("h4"); // create DOM element
    header.textContent = answeredQuestions[i].question; // provide value to Variable

    const paragraph = document.createElement("p"); // create DOM element
    paragraph.textContent = answeredQuestions[i].answer; // provide value to variable

    li.appendChild(header); // make h4 a child to li
    li.appendChild(paragraph); // make p a child to li
    ul.appendChild(li); // make li a child to ul
  }

  const jsonAnsweredQuestions = JSON.stringify(answeredQuestions);
  localStorage.setItem("answeredQuestions", jsonAnsweredQuestions);
}

// TO-DO

// ✔ Use localStorage to save an array of previously answered questions and their responses.

// When the page loads, check if there are saved answers in local storage and display them in the list.

// Ensure that upon button click, the new question is retrieved, and any existing answers are still visible after a page refresh.
