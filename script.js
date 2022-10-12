import Ball from './Ball.js';
import Paddle from './Paddle.js';

const startButton = document.getElementById('start-button');

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');

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
  const rect = ball.rect();

  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = Number.parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = Number.parseInt(computerScoreElem.textContent) + 1;
  }

  ball.reset();
  computerPaddle.reset();
}

startButton.addEventListener('click', () => {
  console.log('START!');

  const ballElem = ball.ballElem;
  ballElem.style.display = 'block';
  startButton.style.display = 'none';

  // Start animation
  window.requestAnimationFrame(update);
});

// Touch-screen (mobile) device
if ('ontouchmove' in document.documentElement) {
  document.documentElement.addEventListener('touchmove', (e) => {
    const evt = typeof e.originalEvent === 'undefined' ? e : e.originalEvent;
    const touch = evt.touches[0] || evt.changedTouches[0];
    playerPaddle.position = (touch.pageY / window.innerHeight) * 100;
  });
}
// Desktop device
else {
  document.addEventListener('mousemove', (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
  });
}
