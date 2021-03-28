// declaring grid, block measures, ball measures, timer, score
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let score = 0;
let timerId;

// starting user position
const userStart = [230, 10];
let currentUserPosition = userStart;

// starting ball position
const ballStart = [270, 35];
let currentBallPosition = ballStart;
let xDirection = 2;
let yDirection = 2;

// creating Block
class Block {
  constructor(xAxis, yAxis) {
    // generating all the four points
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// creating all the blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlocks();

// creating the user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
user.style.left = grid.appendChild(user);

// drawing the user
function drawUser() {
  user.style.left = currentUserPosition[0] + "px";
  user.style.bottom = currentUserPosition[1] + "px";
}

// controlling user movements
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      // avoids go beyond border
      if (currentUserPosition[0] > 0) {
        currentUserPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      // avoids go beyond border
      if (currentUserPosition[0] < boardWidth - blockWidth) {
        currentUserPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

// creating the ball
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);

// drawing the ball
function drawBall() {
  ball.style.left = currentBallPosition[0] + "px";
  ball.style.bottom = currentBallPosition[1] + "px";
}
drawBall();

// controlling ball movements
function moveBall() {
  currentBallPosition[0] += xDirection;
  currentBallPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);
// change the direction if hit border
function checkForCollisions() {
  // checking for block collisions
  for (let i = 0; i < blocks.length; i++) {
    // check if ball is between block area
    if (
      currentBallPosition[0] > blocks[i].bottomLeft[0] &&
      currentBallPosition[0] < blocks[i].bottomRight[0] &&
      currentBallPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      currentBallPosition[1] < blocks[i].topLeft[1]
    ) {
      // removing the block hit
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
    }
  }

  // checking for wall collisions
  if (
    currentBallPosition[0] >= boardWidth - ballDiameter ||
    currentBallPosition[1] >= boardHeight - ballDiameter ||
    currentBallPosition[0] <= 0
  ) {
    changeDirection();
  }

  // check for game over
  if (currentBallPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "you lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
