let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestions = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// 10 questions with options and answers array.
const quizArray = [
  {
    id: "0",
    question: "Javascript is an _______ language? ",
    options: [
      "Object Oriented",
      " Object-based",
      "Procedural",
      "None of Above",
    ],
    correct: "Object-Oriented",
  },
  {
    id: "1",
    question: "Which of the following is correct about JavaScript?",
    options: [
      "JavaScript is an Object-Based language",
      "JavaScript is Assembly-language",
      "JavaScript is an Object-Oriented language",
      "JavaScript is a High-level language",
    ],
    correct: "JavaScript is an Object-Based language",
  },
  {
    id: "2",
    question:
      "Among the given statements, which statement defines closures in JavaScript?",
    options: [
      "JavaScript is a function that is enclosed with references to its inner function scope",
      "JavaScript is a function that is enclosed with references to its lexical environment",
      "JavaScript is a function that is enclosed with the object to its inner function scope",
      "None of the mentioned",
    ],
    correct:
      "JavaScript is a function that is enclosed with references to its lexical environment",
  },
  {
    id: "3",
    question:
      "Arrays in JavaScript are defined by which of the following statements ? ",
    options: [
      "It is an ordered list of values",
      "It is an ordered list of objects",
      "It is an ordered list of string",
      "It is an ordered list of functions",
    ],
    correct: "It is an ordered list of values",
  },
  {
    id: "4",
    question: "  Which of the following is not javascript data types? ",
    options: [
      "Null type",
      "Undefined type",
      "Number type",
      "All of the mentioned",
    ],
    correct: "All of the mentioned",
  },
  {
    id: "5",
    question:
      " Where is Client-side JavaScript code is embedded within HTML documents? ",
    options: [
      "A URL that uses the special javascript:code",
      "A URL that uses the special javascript:protocol",
      "A URL that uses the special javascript:encoding",
      "A URL that uses the special javascript:stack",
    ],
    correct: "A URL that uses the special javascript:protocol",
  },
  {
    id: "6",
    question:
      " Which of the following object is the main entry point to all client-side JavaScript features and APIs? ",
    options: ["Position", "Window", "Standard", "Location"],
    correct: "Window",
  },
  {
    id: "7",
    question:
      "Which of the following can be used to call a JavaScript Code Snippet? ? ",
    options: ["Function/Method", "Preprocessor", "Triggering Event", "RMI"],
    correct: "Function/Method",
  },
  {
    id: "8",
    question:
      "Which of the following explains correctly what happens when a JavaScript program is developed on a Unix Machine ? ",
    options: [
      "will work perfectly well on a Windows Machine",
      "will be displayed as JavaScript text on the browser",
      "will throw errors and exceptions",
      "must be restricted to a Unix Machine only",
    ],
    correct: "will work perfectly well on a Windows Machine",
  },
  {
    id: "9",
    question: " Which of the following scoping type does JavaScript use ? ",
    options: ["Sequential", "Segmental", "Lexical", "Literal"],
    correct: "Lexical",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML =
        "Your Score is " + scoreCount + " Out of " + questionCount;
    } else {
      countOfQuestions.innerHTML =
        questionCount + 1 + " Of " + quizArray.length + " question ";

      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);


const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

function quizCreater() {
  quizArray.sort(() => Math.random() - 0.5);

  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    countOfQuestions.innerHTML = 1 + " of " + quizArray.length + " question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    div.innerHTML += `
        <button class="option-div" onclick="checker(this)">
        ${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[3]}</button>
        `;

    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution == quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreater();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
