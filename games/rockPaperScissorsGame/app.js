// starting scores
let userScore = 0;
let computerScore = 0;

// caching the DOM: selecting elements
const userScore_span = document.querySelector("#user-score");
const computerScore_span = document.querySelector("#computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.querySelector("#r");
const paper_div = document.querySelector("#p");
const scissors_div = document.querySelector("#s");

// randomizing computer choice
function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

// converting arguments
function convertToWord(letter) {
  if (letter === "r") return "rock";
  if (letter === "p") return "paper";
  if (letter === "s") return "scissors";
}

// creating result logic
function win(userChoice, computerChoice) {
  const smallUserWord = "user".fontsize(3).sub();
  const smallComputerWord = "computer".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} beats ${convertToWord(
    computerChoice
  )}${smallComputerWord}   you win!`;
  userChoice_div.classList.add("green-glow");
  setTimeout(() => userChoice_div.classList.remove("green-glow"), 300);
}

function lose(userChoice, computerChoice) {
  const smallUserWord = "user".fontsize(3).sub();
  const smallComputerWord = "computer".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} loses to ${convertToWord(
    computerChoice
  )}${smallComputerWord}   you lost!`;
  userChoice_div.classList.add("red-glow");
  setTimeout(() => userChoice_div.classList.remove("red-glow"), 300);
}

function draw(userChoice, computerChoice) {
  const userChoice_div = document.getElementById(userChoice);
  const smallUserWord = "user".fontsize(3).sub();
  const smallComputerWord = "computer".fontsize(3).sub();
  result_p.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} equals ${convertToWord(
    computerChoice
  )}${smallComputerWord}   it's a draw!`;
  userChoice_div.classList.add("gray-glow");
  setTimeout(() => userChoice_div.classList.remove("gray-glow"), 300);
}

// creating rules of result
function game(userChoice) {
  const computerChoice = getComputerChoice();
  console.log("user choice: ", userChoice);
  console.log("computer choice: ", computerChoice);
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
}

// adding event listeners
function main() {
  rock_div.addEventListener("click", () => game("r"));
  paper_div.addEventListener("click", () => game("p"));
  scissors_div.addEventListener("click", () => game("s"));
}
main();
