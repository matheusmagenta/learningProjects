// selecting DOM element
const msgEl = document.getElementById("msg");

// generating random Number
const randomNum = getRandomNumber();
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
console.log("randomNum: ", randomNum);

// capturing user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log("msg speak", msg);

  // displaying msg on window
  writeMessage(msg);

  // checking if is number and is in the range
  checkNumber(msg);
}

// writing what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
    `;
}

// checking msg against number
function checkNumber(msg) {
  const num = +msg;

  //checking if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML = "<div>That is not a valid number</div>";
    return;
  }

  // checking if number is in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
    return;
  }

  // checking if number is correct
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
      `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  }
}

// starting recognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();

// starting game
recognition.start();
// speak result
recognition.addEventListener("result", onSpeak);
// ending SpeechRecognition service
recognition.addEventListener("end", () => recognition.start());
document.body.addEventListener("click", () => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
