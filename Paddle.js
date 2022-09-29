const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position() {
    return Number.parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('--topPosition'));
  }

  set position(value) {
    this.paddleElem.style.setProperty('--topPosition', value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  update(delta, ballHeigth) {
    this.position += SPEED * delta * (ballHeigth - this.position);
  }
}
