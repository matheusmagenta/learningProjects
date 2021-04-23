// making sure all HTML file is read before JS code
document.addEventListener("DOMContentLoaded", () => {
  // selecting elements
  const grid = document.querySelector(".grid");
  let width = 10;
  let bombAmount = 20;
  let flags = 0;
  let squares = [];
  let isGameOver = false;

  // creating board
  function createBoard() {
    // getting shuffled game array with random bombs and empty spaces
    const bombsArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
    //console.log(shuffledArray);

    // creating squares
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);

      // adding classname 'bomb' or valid
      square.classList.add(shuffledArray[i]);

      // adding square to the board
      grid.appendChild(square);
      squares.push(square);

      // adding event listeners
      // normal click
      square.addEventListener("click", function (e) {
        click(square);
      });
      //ctrl and left click
      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };
    }

    // adding numbers of how many bombs are around each square
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      // creating edges to limit checking squares at the same side of the board
      // width = 10
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      //checking if the square is valid
      if (squares[i].classList.contains("valid")) {
        // setting rules to check bombs around respecting the board edges
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
          total++;

        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        )
          total++;

        if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        )
          total++;

        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
          total++;

        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        )
          total++;
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        ) {
          total++;
        }
        if (i < 89 && squares[i + width].classList.contains("bomb")) {
          total++;
        }
        //console.log("total: ", total);
        squares[i].setAttribute("data", total);
      }
    }
  }
  createBoard();

  //  add flags with right click
  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        square.innerHTML = "🚩";
        flags++;
        // check for win
        checkForWin();
      } else {
        square.classList.remove("flag");
        square.innerHTML = "";
        flags--;
      }
    }
  }

  // click on square actions
  function click(square) {
    //getting square id
    let currentId = square.id;

    // checking if game is over or if sqware already checked or flagged
    if (isGameOver) return;
    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;

    // if user clicks a bomb
    if (square.classList.contains("bomb")) {
      gameOver(square);
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");

        // displaying the total of bombs around
        square.innerHTML = total;
        return;
      }
      // recursion - checking neighbouring squares
      checkSquare(square, currentId);
    }
    // adding checked to square with no bomb around
    square.classList.add("checked");
  }

  // checking neighbouring squares once square is clicked
  function checkSquare(square, currentId) {
    // checking if square is in the edge
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId) - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  // game over
  function gameOver(square) {
    console.log("BOOM! game over");
    isGameOver = true;
    // show ALL the bombs
    squares.forEach((square) => {
      if (square.classList.contains("bomb")) {
        square.innerHTML = "💣";
      }
    });
  }

  // check for win
  function checkForWin() {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains("flag") &&
        squares[i].classList.contains("bomb")
      ) {
        matches++;
      }
      if (matches == bombAmount) {
        console.log("you won");
        isGameOver = true;
      }
    }
  }
});
