document.addEventListener("DOMContentLoaded", () => {
  // selecting DOM elements
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 28; // 28 * 28 = 784 squares
  let score = 0;

  // LAYOUT of the grid and what is in each square
  const layout = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    3,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    3,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    1,
    1,
    2,
    2,
    1,
    1,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    4,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    4,
    0,
    0,
    0,
    4,
    4,
    4,
    4,
    4,
    4,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    4,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    4,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    3,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    3,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ];
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  // CREATING AND RENDERING THE GRID
  const squares = [];
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      // putting squares in the grid
      grid.appendChild(square);
      squares.push(square);

      // adding layout to the board
      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot");
      } else if (layout[i] === 1) {
        squares[i].classList.add("wall");
      } else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      } else if (layout[i] === 3) {
        squares[i].classList.add("power-pellet");
      }
    }
  }
  createBoard();

  // CREATING PAC-MAN AT START POSITION
  let pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add("pac-man");

  // CREATING MOVE COMMANDS
  function movePacman(e) {
    // first remove the starting position
    squares[pacmanCurrentIndex].classList.remove("pac-man");

    switch (e.keyCode) {
      // checking direction, wall and ghost lair
      // moving left
      case 37:
        if (
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex -= 1;

        // check if pacman is in the left exit
        if (pacmanCurrentIndex - 1 === 363) {
          pacmanCurrentIndex = 391;
        }
        break;
      //moving up
      case 38:
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex -= width;
        break;
      //moving right
      case 39:
        if (
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex += 1;
        // check if pacman is in the right exit
        if (pacmanCurrentIndex + 1 === 392) {
          pacmanCurrentIndex = 364;
        }
        break;
      // moving down
      case 40:
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex += width;
        break;
    }

    squares[pacmanCurrentIndex].classList.add("pac-man");

    // pac-man eats a dot
    pacDotEaten();

    // pac-man eats a power pellet
    powerPelletEaten();

    // ghost eats pac-man
    checkForGameOver();

    // pac-man eats equivalent to all the 274 dots
    checkForWin();
  }

  document.addEventListener("keyup", movePacman);

  ///// WHAT HAPPENS IF...
  // ...PAC-MAN EATS A DOT
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
      // adding 1 to the score
      score++;
      scoreDisplay.innerHTML = score;
      // remove dot from the board
      squares[pacmanCurrentIndex].classList.remove("pac-dot");
    }
  }
  // ...PAC-MAN EATS A POWER PELLET
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
      // adding 10 points to the score
      score += 10;
      // adding isScared to the ghosts
      ghosts.forEach((ghost) => (ghost.isScared = true));
      // setting scare time to 10 seconds
      setTimeout(unScareGhost, 10000);
      // removing the power pellet class
      squares[pacmanCurrentIndex].classList.remove("power-pellet");
    }
  }
  // ...GHOSTS ARE NOT SCARED ANYMORE
  function unScareGhost() {
    ghosts.forEach((ghost) => (ghost.isScared = false));
  }

  // ...GHOST EATS PAC-MAN (GAME OVER!)
  function checkForGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains("ghost") &&
      !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      // displaying game over
      scoreDisplay.innerHTML = "GAME OVER!";
    }
  }

  // ...PAC-MAN EATS ALL THE DOTS AND POWER PELLETS OR MANY GHOSTS (WIN!)
  function checkForWin() {
    if (score === 274) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      scoreDisplay.innerHTML = "YOU WON!";
    }
  }

  //////

  // CREATING THE GHOSTS
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.timerId = NaN;
      this.isScared = false;
    }
  }
  ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clide", 379, 500),
  ];

  // DRAWING GHOSTS ONTO THE GRID
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add("ghost");
  });

  // MOVING ALL THE GHOSTS RANDOMLY
  ghosts.forEach((ghost) => moveGhost(ghost));

  function moveGhost(ghost) {
    // generating random direction
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
      // checking if ghost can move
      // if next square does not contain wall or ghost, ghost can move
      if (
        !squares[ghost.currentIndex + direction].classList.contains("wall") &&
        !squares[ghost.currentIndex + direction].classList.contains("ghost")
      ) {
        // removing all ghost related classes
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        // changing the currentIndex to the new safe square
        ghost.currentIndex += direction;
        // redrawing the ghost in the new safe place
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
      // else, find a new direction
      else {
        direction = directions[Math.floor(Math.random() * directions.length)];
      }

      // if the ghost is currently scared, change its color
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost");
      }

      // if the ghost is currently scared and pacman runs into it
      if (
        ghost.isScared &&
        squares[ghost.currentIndex].classList.contains("pac-man")
      ) {
        // removing the ghost from current position
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        // putting ghost to its starting position
        ghost.currentIndex = ghost.startIndex;
        // adding 100 points to the score
        score += 100;
        // recreating the ghost at ghost lair
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
      checkForGameOver();
    }, ghost.speed);
  }
});
