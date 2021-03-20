// wait for HTML to be ready before load JS script
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  let score = 0;

  const candyColors = [
    "url(images/red-candy.png)",
    "url(images/yellow-candy.png)",
    "url(images/orange-candy.png)",
    "url(images/purple-candy.png)",
    "url(images/green-candy.png)",
    "url(images/blue-candy.png)",
  ];

  // CREATING A BOARD
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      // creating DOM element
      const square = document.createElement("div");

      // making each square draggable
      square.setAttribute("draggable", true);

      // identifying each square with an id
      square.setAttribute("id", i);

      // assigning a random color to each square
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];

      // adding each DOM element to the grid
      grid.appendChild(square);
      // adding each square to an array of squares
      squares.push(square);
    }
  }
  createBoard();

  // DRAGGING THE CANDIES
  // declaring helper variables
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  // setting feature
  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    // getting color of the square being dragged
    colorBeingDragged = this.style.backgroundImage;
    // console.log(colorBeingDragged);

    // getting id of the square being dragged
    squareIdBeingDragged = parseInt(this.id);

    // console.log(squareIdBeingDragged, "dragstart");
  }

  function dragOver(e) {
    e.preventDefault();
    //console.log(this.id, "dragover");
  }

  function dragEnter(e) {
    e.preventDefault();
    //console.log(this.id, "dragenter");
  }

  function dragLeave() {
    //console.log(this.id, "dragleave");
  }

  function dragEnd() {
    // console.log(this.id, "dragend");
    // SETTING RULES
    // what is a valid move
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];

    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
      // console.log("squareIdBeingReplaced:", squareIdBeingReplaced);
      // console.log("validMove:", validMove);
    } else
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  }

  // DROPPING CANDIES TO THE EMPTY SQUARES
  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        // passing the color to the empty square
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        // clearing the square
        squares[i].style.backgroundImage = "";

        // GENERATING NEW CANDIES
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i); // return boolean
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          // getting random color
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  // CHECKING FOR MATCHES
  // TODO: fix bug with matching row with the first row. it leaves the first row empty sometimes.
  // check for row of four
  function checkRowForFour() {
    // how many square we need to loop
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      // check if it is the last squares of each row
      const notValid = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        // add score
        score += 4;
        scoreDisplay.innerHTML = score;
        // clean Four rows
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForFour();

  // check for column of four
  function checkColumnForFour() {
    // how many square we need to loop
    for (i = 0; i < 39; i++) {
      let columnForFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnForFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        // add score
        score += 4;
        scoreDisplay.innerHTML = score;
        // console.log("score:", score);
        // clean Four rows
        columnForFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnForFour();

  // check for row of three
  function checkRowForThree() {
    // how many square we need to loop
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      // check if it is the last squares of each row
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        // add score
        score += 3;
        scoreDisplay.innerHTML = score;
        // console.log("score:", score);
        // clean three rows
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForThree();

  // check for column of three
  function checkColumnForThree() {
    // how many square we need to loop
    for (i = 0; i < 47; i++) {
      let columnForThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnForThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        // add score
        score += 3;
        scoreDisplay.innerHTML = score;
        // console.log("score:", score);
        // clean three rows
        columnForThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnForThree();

  // need to be refactored for best practice (check tetris tutorial)
  window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveDown();
  }, 100);

  function dragDrop() {
    // console.log(this.id, "dragdrop");
    // getting color of square being replaced
    colorBeingReplaced = this.style.backgroundImage;

    // getting id of the square being replaced
    squareIdBeingReplaced = parseInt(this.id);

    // replacing the colors of the square replaced and the square dragged
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }
});
