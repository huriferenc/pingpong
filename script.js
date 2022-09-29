import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');

const playerWonSound = new Audio('./player.mp3');
const computerWonSound = new Audio('./computer.m4a');

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;

    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    computerPaddle.update(delta, ball.y);

    const hue = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--hue')
    );

    document.documentElement.style.setProperty('--hue', hue + delta * 0.01);

    if (isLose()) {
      handleLose();
    }
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  playerWonSound.pause();
  playerWonSound.currentTime = 0;
  computerWonSound.pause();
  computerWonSound.currentTime = 0;

  const rect = ball.rect();

  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = Number.parseInt(playerScoreElem.textContent) + 1;
    playerWonSound.play();
  } else {
    computerScoreElem.textContent = Number.parseInt(computerScoreElem.textContent) + 1;
    computerWonSound.play();
  }

  ball.reset();
  computerPaddle.reset();
}

// Touch-screen (mobile) device
if ('ontouchmove' in document.documentElement) {
  document.addEventListener('touchmove', (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
  });
}
// Desktop device
else {
  document.addEventListener('mousemove', (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
  });
}

window.requestAnimationFrame(update);
