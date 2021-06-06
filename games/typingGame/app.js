// selecting DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// list of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// init difficulty // checking localStorage for difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : medium;

// setting difficulty selected value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : medium;

// focus on text input on start
text.focus();

// functions

// starting counting down
const timeInterval = setInterval(updateTime, 1000);

// getting a random word from words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// adding word to the DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// updating score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// updating time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  // avoiding negative time
  // game over
  if (time === 0) {
    clearInterval(timeInterval);
    // ending game
    gameOver();
  }
}

// game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = "flex";
}

addWordToDOM();

// event listeners
// typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  // check if inserted text is equal to random word
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear the text input field
    e.target.value = "";

    // adding seconds (via difficulty) if inserted word correctly
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// settings select difficulty
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  // adding  difficulty to the localStorage
  localStorage.setItem("difficulty", difficulty);
});
