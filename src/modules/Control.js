import { Snake } from "./Snake.js";
export class Control {
  /**
   * @param {Snake} snake
   */
  constructor(snake) {
    this.snake = snake;
    this.leftKey = snake.leftKey;
    this.rightKey = snake.rightKey;
  }
  /**
   * Checks if keypressed is turning the snake and then turns the snake if condition.
   * @param {KeyboardEvent} event
   */
  onKeyPressEvent(event) {
    console.log(event.key);
    if (event.key === this.leftKey) {
      this.snake.turnLeft();
      console.log(this.snake.style + ": turned left");
    }
    if (event.key === this.rightKey) {
      this.snake.turnRight();
      console.log(this.snake.style + ": turned right");
    }
  }
}
