const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const endScreen = document.getElementById("end-screen");
const scoreElement = document.getElementById("score");
const saveButton = document.getElementById("save-btn");
const initialsInput = document.getElementById("initials");

const questions = [
  // JavaScript Basics
  {
    question:
      "What is the purpose of the console.log() function in JavaScript?",
    answers: [
      { text: "Displaying messages to the user", correct: false },
      { text: "Writing data to a file", correct: false },
      { text: "Printing output to the browser console", correct: true },
      { text: "Creating pop-up alerts", correct: false },
    ],
  },

  // HTML Structure
  {
    question: "Which HTML tag is used for creating an unordered list?",
    answers: [
      { text: "< ol >", correct: false },
      { text: "< ul >", correct: true },
      { text: "< li >", correct: false },
      { text: "< list >", correct: false },
    ],
  },

  // CSS Styling
  {
    question: "How can you select an HTML element with the ID 'header' in CSS?",
    answers: [
      { text: "#header", correct: true },
      { text: ".header", correct: false },
      { text: "header", correct: false },
      { text: "element(header)", correct: false },
    ],
  },

  // JavaScript Variables
  {
    question: "What is the keyword used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "variable", correct: false },
    ],
  },

  // HTML Forms
  {
    question:
      "Which HTML element is used to create a text input field in a form?",
    answers: [
      { text: '< input type="text" >', correct: true },
      { text: "< text-input >", correct: false },
      { text: "< textbox >", correct: false },
      { text: "< textfield >", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timerDuration = 60;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("intro").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.querySelector(".quiz").style.display = "block";
  endScreen.style.display = "none";
  timerDuration = 60;
  startTimer();
}

function startTimer() {
  timer = setInterval(function () {
    timerDuration--;
    timerDisplay.textContent = timerDuration;
    if (timerDuration <= 0) {
      endQuiz();
    }
  }, 1000);
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(event) {
  const selectBtn = event.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  console.log("a");
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");

    timerDuration -= 60;
    if (timerDuration < 0) {
      timerDuration = 0;
    }
  }

  disableButtons();
  setTimeout(() => {
    handleNextQuestion();
  }, 1000);
}

function disableButtons() {
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });
}

function handleNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  questionElement.innerHTML = "";
  timerDisplay.textContent = "0";
  nextButton.style.display = "none";
  endScreen.style.display = "block";
  scoreElement.textContent = `${score} out of ${questions.length}`;
  document.getElementById("questions").style.display = "none";
}

startButton.addEventListener("click", startQuiz);
