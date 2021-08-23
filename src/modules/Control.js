import { Snake } from "./Snake.js";
export class Control {
  /**
   * @param {Snake} snake
   * @param {string} leftKey
   * @param {string} rightKey
   */
  constructor(snake, leftKey, rightKey) {
    this.snake = snake;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
  }
  /**
   * Checks if keypressed is turning the snake and then turns the snake if condition.
   * @param {KeyboardEvent} event
   */
  onKeyPressEvent(event) {
    if (event.key === this.leftKey) this.snake.turnLeft();
    if (event.key === this.rightKey) this.snake.turnRight();
  }
}
