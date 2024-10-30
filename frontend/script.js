const previouslyAnsweredSelectors = [];

const questionH2 = document.getElementById("question");

const generateBtn = document.getElementById("new-question");

const submitBtn = document.getElementById("submit-answer");

const answerField = document.getElementById("answer");

const ul = document.getElementById("answer-list");

let randomSelector = null;

let questionsData = null;

let question = null;

window.onload = async function getStoredList() {
  const res = await fetch("http://localhost:3000/questions"); // REPLACE THIS URL WITH MY OWN

  questionsData = await res.json();

  const initialLocalStorage = JSON.parse(
    localStorage.getItem("answeredQuestions")
  );
  if (initialLocalStorage !== null) {
    initialLocalStorage.forEach((answeredQuestion) => {
      // check questions in inital database and cross reference with localstorage then splice them out
      previouslyAnsweredSelectors.push(answeredQuestion.id);

      // Copies code from submit for loop
      const li = document.createElement("li"); // create DOM element

      const header = document.createElement("h4"); // create DOM element
      header.textContent = answeredQuestion.question; // provide value to Variable

      const paragraph = document.createElement("p"); // create DOM element
      paragraph.textContent = answeredQuestion.answer; // provide value to variable

      li.appendChild(header); // make h4 a child to li
      li.appendChild(paragraph); // make p a child to li
      ul.appendChild(li); // make li a child to ul
    });
  }
};

generateBtn.addEventListener("click", generateQuestion);

submitBtn.addEventListener("click", submitAnswer);

submitBtn.disabled = true;
answerField.disabled = true;
answerField.value = " ";

function generateSelector() {
  if (previouslyAnsweredSelectors.length === questionsData.total_amount) {
    questionH2.textContent = "No Questions Left :C";
    return;
  }
  randomSelector = Math.floor(Math.random() * questionsData.total_amount);

  if (previouslyAnsweredSelectors.includes(randomSelector)) {
    generateSelector();
  }
}

async function generateQuestion() {
  if (randomSelector === null) {
    generateSelector();
  }
  if (questionsData.total_amount > 0 && randomSelector !== null) {
    const res = await fetch("http://localhost:3000/question/" + randomSelector);
    question = await res.text();

    questionH2.textContent = question;
    submitBtn.disabled = false;
    answerField.disabled = false;
  }
  generateBtn.disabled = true;
}

function submitAnswer() {
  previouslyAnsweredSelectors.push(randomSelector);
  const answer = answerField.value;
  const answeredQuestion = {
    question: question,
    answer: answer,
    id: randomSelector,
  };

  let latestLocalStorage = JSON.parse(
    localStorage.getItem("answeredQuestions")
  );
  if (latestLocalStorage === null) {
    latestLocalStorage = [];
  }

  latestLocalStorage.push(answeredQuestion);
  randomSelector = null;
  ul.innerHTML = " ";
  questionH2.textContent = " Click the button for a new question ";
  submitBtn.disabled = true;
  generateBtn.disabled = false;
  answerField.disabled = true;
  answerField.value = " ";

  for (let i = 0; i < latestLocalStorage.length; i++) {
    const li = document.createElement("li"); // create DOM element

    const header = document.createElement("h4"); // create DOM element
    header.textContent = latestLocalStorage[i].question; // provide value to Variable

    const paragraph = document.createElement("p"); // create DOM element
    paragraph.textContent = latestLocalStorage[i].answer; // provide value to variable

    li.appendChild(header); // make h4 a child to li
    li.appendChild(paragraph); // make p a child to li
    ul.appendChild(li); // make li a child to ul
  }

  const jsonAnsweredQuestions = JSON.stringify(latestLocalStorage);
  localStorage.setItem("answeredQuestions", jsonAnsweredQuestions);
}

// TO-DO ✔

// Instead of getting your questions from a hardcoded array, you'll now be fetching them from an external API.

// Use Javascript's fetch API to retrieve a question when the button is clicked:
//   ✔ The base of the external API is: https://philosophy-api.netlify.app/api.
//    ✔ When the "generate question" button is clicked, fetch a question using the following endpoint: /question/[number], where the parameter [number] can be used to get a specific question.
//   ✔ If you need an overview of all the available questions (for example, to see how many there are), you can use the endpoint: /questions.
//    ✔ The endpoint will return a response in text format.

// ✔ Update the DOM with the fetched question, and make sure the website functions the same as before (list of answers, local storage).

// ✔ You may need to figure out a new way to keep track of the questions that the user has already answered, to avoid fetching the same question twice.
