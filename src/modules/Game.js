import { Snake } from "./Snake.js";

export class Game {
  /**
   * @param {function} endGame
   * @param {function} getFreeSquare
   */
  constructor(endGame, snakes, makeFood) {
    this.food = [];
    this.snakes = snakes;
    this.foodCount = settings.Foods;
    this.endGame = endGame;
    this.makeFood = makeFood;
    this.isRunning = false;
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
  /**
   * @param {Snake} s
   */
  moveSnake(s) {
    s.move();
    this.board.transformEdgeCoords(s.getBody());
    let head = s.getHead();
    console.log(head);
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
    if (matches > 1) this.snakes = this.snakes.filter((snake) => snake !== s);
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
    if (this.snakes.length === 1) this.endGame(this.snakes[0]);
    if (this.food.length === 0) {
      let food = this.makeFood(this.snakes);
      this.food.push(food);
    }
  }
}
