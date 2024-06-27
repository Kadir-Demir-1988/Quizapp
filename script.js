let questions = [
  {
    question: "Welche Sprache hat die meisten Muttersprachler?",
    answer_1: "Englisch",
    answer_2: "Spanisch",
    answer_3: "Französisch",
    answer_4: "Chinesisch",
    right_answer: 2,
  },

  {
    question: "Wer war der antike griechische Sonnengott?",
    answer_1: "Zeus",
    answer_2: "Hermes",
    answer_3: "Apollon",
    answer_4: "Poseidon",
    right_answer: 3,
  },

  {
    question: "In welchem Land wird pro Kopf am meisten Kaffee getrunken?",
    answer_1: "Finnland",
    answer_2: "Deutschland",
    answer_3: "Italien",
    answer_4: "Japan",
    right_answer: 1,
  },

  {
    question:
      "Welches Unternehmen war ursprünglich unter dem Namen „Blue Ribbon Sports“ bekannt?",
    answer_1: "Adidas",
    answer_2: "Puma",
    answer_3: "Nike",
    answer_4: "Lacoste",
    right_answer: 3,
  },
];

let rightquestions = 0;
let currentQuestion = 0;

let AUDIO_SUCCES = new Audio("audio/correct-156911.mp3");
let AUDIO_FAIL = new Audio("audio/incorrect-buzzer-sound-147336.mp3");

function init() {
  document.getElementById("all-questions").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (selectedQuestionNumber == question["right_answer"]) {
    console.log("Richtige Antwort!!");
    document.getElementById(selection).parentNode.classList.add("bg-success");
    AUDIO_SUCCES.play();
    rightquestions++;
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }

  document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-button").disabled = true;
  resetAnswerButton();
  showQuestion();
}

function resetAnswerButton() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById("headerimg").src = "/img/questions.png";
  document.getElementById("questionBody").style = ""; // questionbody wieder anzeigen
  document.getElementById("endScreen").style = "display: none"; // endscreen ausblenden

  rightquestions = 0;
  currentQuestion = 0;

  init();
}

function showEndScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = "display: none";
  document.getElementById("amount-Questions").innerHTML = questions.length;
  document.getElementById("amount-rightquestions").innerHTML = rightquestions;
  document.getElementById("headerimg").src = "img/Pokal.jpg";
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").innerHTML = `${percent} %`;
  document.getElementById("progress-bar").style = `width: ${percent}%`;
}

function updateToNextQuestion() {
  updateProgressBar();

  let question = questions[currentQuestion];
  document.getElementById("question-number").innerHTML = currentQuestion + 1;
  document.getElementById("questiontext").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}
