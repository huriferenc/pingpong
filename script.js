// A canvas elem referenciája
const canvas = document.getElementById('game-table');
// A canvas 2D rajzoló kontextusa
const ctx = canvas.getContext('2d');

// A bal oldali ütő objektuma
const leftPaddle = {
  x: 10, // X koordináta
  y: canvas.height / 2 - 50, // Y koordináta
  width: 10, // Szélesség
  height: 100 // Magasság
};

// A jobb oldali ütő objektuma
const rightPaddle = {
  x: canvas.width - 20, // X koordináta
  y: canvas.height / 2 - 50, // Y koordináta
  width: 10, // Szélesség
  height: 100 // Magasság
};

// A labda objektuma
const ball = {
  x: canvas.width / 2, // X koordináta
  y: canvas.height / 2, // Y koordináta
  radius: 10, // Sugár
  speedX: 5, // X irányú sebesség
  speedY: 5 // Y irányú sebesség
};

// A bal oldali pontszám
let leftScore = 0;
// A jobb oldali pontszám
let rightScore = 0;

// Billentyűlenyomás eseményfigyelő
document.addEventListener('keydown', (e) => {
  const btnDelta = 6;

  switch (e.key) {
    case 'ArrowLeft':
      moveFn(paddle.position - btnDelta);
      break;
    case 'ArrowRight':
      moveFn(paddle.position + btnDelta);
      break;
  }
});
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  switch (e.key) {
    case 'w':
      // Baloldali ütő felfelé mozgatása
      leftPaddle.y -= 10;
      break;
    case 's':
      // Baloldali ütő lefelé mozgatása
      leftPaddle.y += 10;
      break;
    case 'ArrowUp':
      // Jobboldali ütő felfelé mozgatása
      rightPaddle.y -= 10;
      break;
    case 'ArrowDown':
      // Jobboldali ütő lefelé mozgatása
      rightPaddle.y += 10;
      break;
  }
});

// Ütő rajzolása
function drawPaddle(paddle) {
  // Útvonal kezdése
  ctx.beginPath();
  // Téglalap rajzolása az ütő koordinátáira és méretére
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  // Kitöltő szín beállítása
  ctx.fillStyle = '#ffffff';
  // Kitöltés
  ctx.fill();
  // Útvonal bezárása
  ctx.closePath();
}

// Labda rajzolása
function drawBall() {
  // Útvonal kezdése
  ctx.beginPath();
  // Kör rajzolása a labda koordinátáira és sugara szerint
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  // Kitöltő szín beállítása
  ctx.fillStyle = '#ffffff';
  // Kitöltés
  ctx.fill();
  // Útvonal bezárása
  ctx.closePath();
}

// Pontszám rajzolása
function drawScore() {
  // Betűtípus beállítása
  ctx.font = '16px Arial';
  // Betűszín beállítása
  ctx.fillStyle = '#ffffff';
  // Pontszám kiírása a canvas-ra
  ctx.fillText('Score: ' + leftScore + ' - ' + rightScore, 8, 20);
}

// Játék rajzolása
function draw() {
  // Canvas törlése
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Bal oldali ütő rajzolása
  drawPaddle(leftPaddle);
  // Jobb oldali ütő rajzolása
  drawPaddle(rightPaddle);
  // Labda rajzolása
  drawBall();
  // Pontszám rajzolása
  drawScore();

  // Labda mozgatása
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Labda ütközése a canvas alsó és felső szélével
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    // Y irányú sebesség változtatása
    ball.speedY = -ball.speedY;
  }

  // Labda ütközése a bal oldali ütővel
  if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width) {
    // Ha a labda a bal oldali ütő tetején vagy alján érkezik
    if (ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
      // X irányú sebesség változtatása
      ball.speedX = -ball.speedX;
    }
    // Ha a labda nem érkezik az ütő tetején vagy alján
    else {
      // Jobb oldali pontszám növelése
      rightScore++;
      // Labda újrakezdése
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speedX = -ball.speedX;
    }
  }

  // Labda ütközése a jobb oldali ütővel
  if (ball.x + ball.radius > rightPaddle.x) {
    // Ha a labda a jobb oldali ütő tetején vagy alján érkezik
    if (ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
      // X irányú sebesség változtatása
      ball.speedX = -ball.speedX;
    }
    // Ha a labda nem érkezik az ütő tetején vagy alján
    else {
      // Bal oldali pontszám növelése
      leftScore++;
      // Labda újrakezdése
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speedX = -ball.speedX;
    }
  }

  // Következő képkocka
  requestAnimationFrame(draw);
}

// Első képkocka
draw();
