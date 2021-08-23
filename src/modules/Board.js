import { Snake } from "./Snake";

export class Board {
  /**
   * @param {number} x_Tiles
   * @param {number} y_Tiles
   * @param {number} foodCount
   */
  constructor(X_Tiles, Y_Tiles) {
    this.leftEnd = 0;
    this.topEnd = 0;
    this.rightEnd = X_Tiles - 1;
    this.downEnd = Y_Tiles - 1;
  }
  /**
   * @param {number} direction
   * @param {[number]} coords
   */
  adjustEnds(coord) {}
  /**
   * @param {Snake} snake
   */
  moveSnake(snake) {
    let body = snake.move();
    //adjust the body at edges
    body.forEach((coord) => {
      coord[0] =
        coord[0] > this.rightEnd
          ? (coord[0] -= this.rightEnd + 1)
          : coord[0] < 0
          ? (coord[0] += this.rightEnd + 1)
          : coord[0];
      coord[1] =
        coord[1] > this.topEnd
          ? (coord[1] -= this.topEnd + 1)
          : coord[1] < 0
          ? (coord[1] += this.topEnd + 1)
          : coord[1];
    });
  }
}
