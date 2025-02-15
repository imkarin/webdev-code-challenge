const previouslyAnsweredIds = [];

const questionH2 = document.getElementById("question");

const generateBtn = document.getElementById("new-question");

const submitBtn = document.getElementById("submit-answer");

const answerField = document.getElementById("answer");

const ul = document.getElementById("answer-list");

let questionsData = null;

let questionObj = null;

window.onload = async function getStoredList() {
  const res = await fetch("http://localhost:3000/questions", {
    credentials: "include",
  });

  // If we get a 401 response (not logged in), redirect to login page
  if (res.status === 401) {
    return window.location.replace("./login.html");
  }

  questionsData = await res.json();

  const answeredQuestions = questionsData.answeredQuestions;

  if (answeredQuestions !== null) {
    answeredQuestions.forEach((answeredQuestion) => {
      // check questions in inital database and cross reference with localstorage then splice them out
      previouslyAnsweredIds.push(answeredQuestion.id);

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

async function generateQuestion() {
  if (questionsData.total_amount > 0) {
    const res = await fetch("http://localhost:3000/question", {
      credentials: "include",
    });
    questionObj = await res.json();

    questionH2.textContent = questionObj.question;
    submitBtn.disabled = false;
    answerField.disabled = false;
  }
  generateBtn.disabled = true;
}

async function submitAnswer() {
  previouslyAnsweredIds.push(questionObj._id);
  const answer = answerField.value;
  const answeredQuestion = {
    id: questionObj._id,
    answer: answer,
  };
  console.log(answeredQuestion);

  const saveToBackendRes = await fetch("http://localhost:3000/save-answer", {
    credentials: "include",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answeredQuestion), // TO DO add answered question object, something like { id: the question id, answer: "bla"}
  });
  const json = await saveToBackendRes.json();

  // Show all the answered questions in a list on the page, we'll do this later (TO DO):
  ul.innerHTML = " ";
  questionH2.textContent = " Click the button for a new question ";
  submitBtn.disabled = true;
  generateBtn.disabled = false;
  answerField.disabled = true;
  answerField.value = " ";

  for (let i = 0; i < json.updatedAnswers.length; i++) {
    const li = document.createElement("li"); // create DOM element

    const header = document.createElement("h4"); // create DOM element
    header.textContent = json.updatedAnswers[i].question; // provide value to Variable

    const paragraph = document.createElement("p"); // create DOM element
    paragraph.textContent = json.updatedAnswers[i].answer; // provide value to variable

    li.appendChild(header); // make h4 a child to li
    li.appendChild(paragraph); // make p a child to li
    ul.appendChild(li); // make li a child to ul
  }
}
