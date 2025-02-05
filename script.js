const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");

canvas.width = 400;
canvas.height = 500;

let sunflower = { x: 180, y: 450, size: 30, dx: 0 };
let obstacles = [];
let stars = [];
let gameOver = false;
let starCount = 0;

document.addEventListener("keydown", moveSunflower);
restartBtn.addEventListener("click", restartGame);

function moveSunflower(event) {
  if (event.key === "ArrowLeft" && sunflower.x > 0) sunflower.dx = -5;
  else if (
    event.key === "ArrowRight" &&
    sunflower.x < canvas.width - sunflower.size
  )
    sunflower.dx = 5;
}

function createObstacle() {
  let x = Math.random() * (canvas.width - 20);
  obstacles.push({ x: x, y: 0, width: 20, height: 20 });
}

function createStars() {
  if (Math.random() < 0.05) {
    let x = Math.random() * canvas.width;
    stars.push({ x: x, y: -10, size: 5 });
  }
}

function drawSunflower() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(sunflower.x, sunflower.y, sunflower.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacles() {
  ctx.fillStyle = "pink";
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    obstacle.y += 3;

    if (obstacle.y > canvas.height) {
      obstacles.splice(obstacles.indexOf(obstacle), 1);
    }

    if (
      sunflower.x < obstacle.x + obstacle.width &&
      sunflower.x + sunflower.size > obstacle.x &&
      sunflower.y < obstacle.y + obstacle.height &&
      sunflower.y + sunflower.size > obstacle.y
    ) {
      gameOver = true;
      showMessage();
    }
  });
}

function drawStars() {
  ctx.fillStyle = "#ffffff";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    star.y += 2;

    if (star.y > canvas.height) {
      stars.splice(stars.indexOf(star), 1);
    }

    // Increase star count if collected
    if (
      sunflower.x < star.x + star.size &&
      sunflower.x + sunflower.size > star.x &&
      sunflower.y < star.y + star.size &&
      sunflower.y + sunflower.size > star.y
    ) {
      stars.splice(stars.indexOf(star), 1);
      starCount++;
    }
  });
}

function update() {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sunflower.x += sunflower.dx;
    drawSunflower();
    drawObstacles();
    drawStars();
    createStars();
    if (starCount >= 10) showMessage();
    requestAnimationFrame(update);
  }
}

function showMessage() {
  message.textContent =
    "Happy Valentine’s Day, Anushaa! ❤️ You're my sunflower, will you be my bubblegum?";
  message.style.display = "block";
  restartBtn.style.display = "block";
}

function restartGame() {
  sunflower.x = 180;
  obstacles = [];
  stars = [];
  starCount = 0;
  gameOver = false;
  message.style.display = "none";
  restartBtn.style.display = "none";
  update();
}

setInterval(createObstacle, 1000);
update();
