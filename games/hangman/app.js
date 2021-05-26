// selecting elements
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// functions
// show the hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
        </span>
    `
      )
      .join("")}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  //checking if won
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";

    playable = false;
  }
}

//update the wrong letters in dom
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";

    playable = false;
  }
}

// show notification
function showNotification() {
  // show
  notification.classList.add("show");

  // remove after 2 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// keydown letter press
window.addEventListener("keydown", (e) => {
  // keycode letters 65-90
  if (e.code >= "KeyA" && e.code <= "KeyZ") {
    console.log("works", e.key);
    const letter = e.key.toLowerCase();
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        // add letter to correctletters array
        correctLetters.push(letter);
        //update DOM
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        // add letter to wrongletters array
        wrongLetters.push(letter);
        //update DOM
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  playable = true;

  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
