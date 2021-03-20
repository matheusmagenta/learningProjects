// selecting cards
const cards = document.querySelectorAll(".memory-card");

// matching logic
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return; // avoid game crash
  if (this === firstCard) return; // avoid click on the same card

  console.log("this value", this); // this represents the element that fired the event
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    // means this is the first card to be clicked
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // means this is the second card to be clicked
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  // do the cards match?
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  console.log(firstCard.dataset.framework, secondCard.dataset.framework);
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  //it is a match
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  //it is not a match
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  // destructuring method
  [hasFlippedCard, lockBoard] = [false, false];
  [(firstCard, secondCard)] = [null, null];
}

// IIFE = immediately invoked function expression
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

/*
// VERSION 1 
// selecting cards
const cards = document.querySelectorAll(".memory-card");

// matching logic
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  console.log("this value", this); // this represents the element that fired the event
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    // means this is the first card to be clicked
    hasFlippedCard = true;
    firstCard = this;
    console.log("first card", hasFlippedCard, firstCard);
  } else {
    // means this is the second card to be clicked
    hasFlippedCard = false;
    secondCard = this;
    console.log("second card", hasFlippedCard, secondCard);

    // do the cards match?
    console.log(firstCard.dataset.framework, secondCard.dataset.framework);
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      //it is a match
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);

      //   console.log('function was executed') // check if function is working
    } else {
      //it is not a match
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
      }, 1500);
    }
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard)); */
