import Ball from './Ball.js';
import Paddle from './Paddle.js';

const startButton = document.getElementById('start-button');

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');

let lightnessDirection = -1;
let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;

    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    computerPaddle.update(delta, ball.y);

    let foregroundLightness = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--foregroundLightness')
    );
    const backgroundLightness = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--backgroundLightness')
    );

    if (foregroundLightness <= 0) {
      lightnessDirection = 1;
    } else if (foregroundLightness >= 100) {
      lightnessDirection = -1;
    }

    // To set ball and paddles more visible
    const lightnessDiff = Math.floor(Math.abs(foregroundLightness - backgroundLightness));
    if (lightnessDiff === 10) {
      foregroundLightness += lightnessDirection * 20;
    }

    document.documentElement.style.setProperty(
      '--foregroundLightness',
      `${foregroundLightness + lightnessDirection * delta * 0.01}%`
    );
    document.documentElement.style.setProperty(
      '--backgroundLightness',
      `${backgroundLightness - lightnessDirection * delta * 0.01}%`
    );

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
