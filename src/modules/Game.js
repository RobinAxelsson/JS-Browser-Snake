import { SNAKE_HEAD, SNAKE_LENGTH, X_TILES, Y_TILES } from "./Const.js";
import { Snake } from "./Snake.js";

export class Game {
  constructor() {
    this.leftEnd = 0;
    this.topEnd = 0;
    this.rightEnd = X_TILES - 1;
    this.downEnd = Y_TILES - 1;
    this.food = [];
    this.gameOver = false;

    this.snake = new Snake(SNAKE_HEAD.X, SNAKE_HEAD.Y, SNAKE_LENGTH);
    this.coordGetters = [];
    this.getSnakeCoords = this.snake.getBody;
  }
  get Snake() {
    return this.snake;
  }
  getFoodCoords = () => this.food;
  spawnFood() {
    let onSnake = true;
    let body = this.snake.getBody();
    let randX = 0;
    let randY = 0;
    while (onSnake) {
      randX = getRandomInt(this.leftEnd, this.rightEnd);
      randY = getRandomInt(this.topEnd, this.downEnd);
      if (
        body.filter((coord) => coord[0] === randX && coord[1] === randY)
          .length === 0
      )
        onSnake = false;
    }
    this.food.push([randX, randY]);
  }
  tick() {
    this.snake.move();
    //this.snake.info(); writes to console snake info
    if (this.food.length === 0) {
      this.spawnFood();
    }
    let status = this.snakeStatus();
    if (status === Head.Wall) {
      this.gameOver = true;
      return;
    }
    if (status === Head.Food) {
      this.snake.grow();
      this.food.pop();
    }
  }
  snakeStatus = () => Head.getPosition(this.snake, this.food);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
class Head {
  static Free = 0;
  static Food = 1;
  static Wall = 2;
  /**
   * @param {Snake} snake
   * @param {[[number]]} food
   * */
  static getPosition(snake, food) {
    let head = snake.getHead();
    let x = head[0];
    let y = head[1];
    if (x < 0 || x >= X_TILES) return Head.Wall;
    if (y < 0 || y >= Y_TILES) return Head.Wall;
    let fx = food[0][0];
    let fy = food[0][1];
    if (x === fx && y === fy) return Head.Food;
    return Head.Free;
  }
}
export class Direction {
  static Up = 0;
  static Right = 1;
  static Down = 2;
  static Left = 3;
  static toString(d) {
    return d === 0
      ? "Up"
      : d === 1
      ? "Right"
      : d === 2
      ? "Down"
      : d === 3
      ? "Left"
      : null;
  }
  static turnRight(currentDirection) {
    if (currentDirection < 3) return currentDirection + 1;
    if (currentDirection == 3) return 0;
    else throw "direction can only be 0-3";
  }
  static turnLeft(currentDirection) {
    if (currentDirection > 0) return currentDirection - 1;
    if (currentDirection == 0) return 3;
    else throw "direction can only be 0-3";
  }
}
