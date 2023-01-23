import { Snake } from "./Snake.js";
import { Board } from "./Board.js";
/**
 * @typedef {Object} SnakeData
 * @property {number} x
 * @property {number} y
 * @property {number} direction
 * @property {string} style
 * @property {string} leftKey
 * @property {string} rightKey
 */
/**
 * @typedef {Object} GameSettings
 * @property {Board} board
 * @property {number} X_Tiles
 * @property {number} Y_Tiles
 * @property {number} SnakeLength
 * @property {number} SnakeSpeed
 * @property {[SnakeData]} Snakes
 */
export class Game {
  /**
   * @param {GameSettings} settings
   */
  constructor(settings, snakes) {
    this.food = [];
    this.gameOver = false;
    this.foodCount = settings.Foods;
    this.snakes = snakes.map((snakeData) => {
      return new Snake(
        snakeData.x,
        snakeData.y,
        snakeData.direction,
        settings.SnakeLength,
        snakeData.style,
        snakeData.leftKey,
        snakeData.rightKey
      );
    });
    this.board = new Board(settings.X_Tiles, settings.Y_Tiles);
    this.getSnakePieces = () => {
      return this.snakes.reduce(this.snakeReducer, []);
    };
    this.getFoodPieces = () => {
      let pieces = this.food.map((part) => ({
        style: "food",
        coords: [part[0], part[1]],
      }));
      return pieces;
    };
  }
  snakeReducer(outlist, snake) {
    let pieces = snake.body.map((coords) => ({
      style: snake.style,
      coords: coords,
    }));
    return [...outlist, ...pieces];
  }
  spawnFood() {
    let coords = this.board.getFreeSquare(
      this.snakes.reduce((arr, snake) => {
        return [...arr, ...snake.getBody()];
      }, [])
    );
    this.food.push(coords);
  }
  /**
   *
   * @param {Snake} s
   */
  moveSnake(s) {
    s.move();
    this.board.transformEdgeCoords(s.getBody());
    let head = s.getHead();
    this.food.forEach((f) => {
      if (f[0] == head[0] && f[1] == head[1]) {
        s.grow();
        this.food.pop();
      }
    });
    let parts = this.snakes.reduce((arr, snake) => {
      return [...arr, ...snake.getBody()];
    }, []);
    let matches = this.coordsExist(head, parts);
    if (matches > 1) this.gameOver = true;
  }
  coordsExist(coord, arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === coord[0] && arr[i][1] === coord[1]) count++;
    }
    return count;
  }
  tick() {
    this.snakes.forEach((s) => {
      this.moveSnake(s);
    });
    if (this.food.length === 0) {
      this.spawnFood();
    }
  }
}
