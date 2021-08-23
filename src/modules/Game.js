import { Snake } from "./Snake.js";
import { Board } from "./Board.js";
/**
 * @typedef {Object} SnakeData
 * @property {number} x
 * @property {number} y
 * @property {number} direction
 * @property {string} color
 */
/**
 * @typedef {Object} GameSettings
 * @property {Board} board
 * @property {number} X_Tiles
 * @property {number} Y_Tiles
 * @property {number} SnakeLength
 * @property {number} SnakeSpeed
 * @property {SnakeData} Snake
 */
export class Game {
  /**
   * @param {GameSettings} settings
   */
  constructor(settings) {
    this.leftEnd = 0;
    this.topEnd = 0;
    this.rightEnd = settings.X_Tiles - 1;
    this.downEnd = settings.Y_Tiles - 1;
    this.food = [];
    this.gameOver = false;
    this.foodCount = settings.Foods;
    this.snake = new Snake(
      settings.Snake.x,
      settings.Snake.y,
      settings.Snake.direction,
      settings.SnakeLength,
      settings.Snake.color
    );
    this.coordGetters = [];
    this.getSnakeCoords = this.snake.getBody;
    this.board = new Board(settings.X_Tiles, settings.Y_Tiles);
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
    //this.snake.info();
    this.board.moveSnake(this.snake);
    if (this.food.length === 0) {
      this.spawnFood();
    }
    let status = this.snakeStatus();
    if (status === Head.Food) {
      this.snake.grow();
      this.food.pop();
    }
  }
  snakeStatus() {
    let head = this.snake.getHead();
    let x = head[0];
    let y = head[1];
    if (x < 0 || x > this.rightEnd) return Head.Wall;
    if (y < 0 || y > this.downEnd) return Head.Wall;
    let fx = this.food[0][0];
    let fy = this.food[0][1];
    if (x === fx && y === fy) return Head.Food;
    return Head.Free;
  }
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
}
