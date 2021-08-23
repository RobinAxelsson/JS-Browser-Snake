import { Snake } from "./Snake";
export class Board {
  /**
   * @param {number} x_Tiles
   * @param {number} y_Tiles
   * @param {number} foodCount
   */
  constructor(X_Tiles, Y_Tiles) {
    this.min_x = 0;
    this.min_y = 0;
    this.max_x = X_Tiles - 1;
    this.max_y = Y_Tiles - 1;
    this.squares = [];
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
  getFreeSquare(snakecoords) {
    let onSnake = true;
    let randX = 0;
    let randY = 0;
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };
    while (onSnake) {
      randX = getRandomInt(this.min_x, this.max_x);
      randY = getRandomInt(this.min_y, this.max_y);
      if (
        snakecoords.filter((coord) => coord[0] === randX && coord[1] === randY)
          .length === 0
      )
        onSnake = false;
    }
    return [randX, randY];
  }
}
