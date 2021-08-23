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
    //this.getSnakeCoords = this.snake.getBody;
    this.board = new Board(settings.X_Tiles, settings.Y_Tiles);
    this.getSnakePieces = () => {
      let pieces = this.snake
        .getBody()
        .map((part) => ({ style: "snake", coords: [part[0], part[1]] }));
      return pieces;
    };
    this.getFoodPieces = () => {
      let pieces = this.food.map((part) => ({
        style: "food",
        coords: [part[0], part[1]],
      }));
      return pieces;
    };
  }
  getFoodCoords = () => this.food;
  spawnFood() {
    let coords = this.board.getFreeSquare(this.snake.getBody());
    this.food.push(coords);
  }
  moveSnake() {
    this.snake.move();
    this.board.transformEdgeCoords(this.snake.getBody());
  }
  tick() {
    //this.snake.info();
    this.moveSnake();
    if (this.food.length === 0) {
      this.spawnFood();
    }
    let status = this.snakeStatus();
    if (status === Head.Food) {
      this.snake.grow();
      this.food.pop();
    }
    if (status === Head.Body) {
      this.gameOver = true;
    }
  }
  snakeStatus() {
    let head = this.snake.getHead();
    let x = head[0];
    let y = head[1];
    let hit = this.snake.body.filter((p) => p[0] === x && p[1] === y);
    if (hit.length > 1) return Head.Body;
    let fx = this.food[0][0];
    let fy = this.food[0][1];
    if (x === fx && y === fy) return Head.Food;
    return Head.Free;
  }
}
class Head {
  static Free = 0;
  static Food = 1;
  static Body = 2;
}
