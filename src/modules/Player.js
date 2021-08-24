import { Snake } from "./Snake";

//end game + refresh
export class Player {
  constructor(leftKey, rightKey, name, style) {
    this.snake = new Snake();
    this.score = 0;
    this.name = name === undefined ? "Bob" : name;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.style = style;
  }
  set snake(snake) {
    this.snake = snake;
  }
  get score() {
    return this.score;
  }
  incrementScore() {
    this.score++;
  }
  onKeyPressEvent(event) {
    if (event.key === this.leftKey) {
      this.snake.turnLeft();
    }
    if (event.key === this.rightKey) {
      this.snake.turnRight();
    }
  }
}
