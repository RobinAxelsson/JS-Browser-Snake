import { Snake } from "./Snake";
export class Board {
  /**
   * @param {number} X_Tiles
   * @param {number} Y_Tiles
   * @param {number} SnakeLength
   */
  constructor(X_Tiles, Y_Tiles, SnakeLength) {
    this.min_x = 0;
    this.min_y = 0;
    this.max_x = X_Tiles - 1;
    this.max_y = Y_Tiles - 1;
    this.snakeLength = SnakeLength;
    this.squares = [];
  }
  /**
   *
   * @param {[Player]} players
   * @return {[Snake]} snakes
   */
  makeSnakes(players) {
    return players.reduce((snakes, p) => {
      let s = new Snake(this.SnakeLength, p.style);
      let x = this.getRandomInt(this.min_x, this.max_x);
      let y = this.getRandomInt(this.min_y, this.max_y);
      let direction = this.getRandomInt(0, 3);
      s.createBody(x, y, direction);
      this.transformEdgeCoords(s.body);
      snakes.push(s);
    }, []);
  }
  /**
   * @param {[[number]]} coords
   */
  transformEdgeCoords(coords) {
    coords.forEach((coord) => {
      coord[0] =
        coord[0] > this.max_x
          ? (coord[0] -= this.max_x + 1)
          : coord[0] < 0
          ? (coord[0] += this.max_x + 1)
          : coord[0];
      coord[1] =
        coord[1] > this.max_y
          ? (coord[1] -= this.max_y + 1)
          : coord[1] < 0
          ? (coord[1] += this.max_y + 1)
          : coord[1];
    });
  }
  makeFood(snakes) {
    let coords = this.getFreeSquare(
      snakes.reduce((arr, snake) => {
        return [...arr, ...snake.getBody()];
      }, [])
    );
    return coords;
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  getFreeSquare(snakecoords) {
    let onSnake = true;
    let randX = 0;
    let randY = 0;
    while (onSnake) {
      randX = this.getRandomInt(this.min_x, this.max_x);
      randY = this.getRandomInt(this.min_y, this.max_y);
      if (
        snakecoords.filter((coord) => coord[0] === randX && coord[1] === randY)
          .length === 0
      )
        onSnake = false;
    }
    return [randX, randY];
  }
}
