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
  }
  /**
   * @param {Snake} snake
   */
  moveSnake(snake) {
    snake.move();
    //adjust the body at edges
    snake.body.forEach((coord) => {
      console.log("x: " + coord[0]);
      console.log("y: " + coord[1]);
      console.log("max_y: " + this.max_y);
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
      console.log("x: " + coord[0]);
      console.log("y: " + coord[1]);
    });
  }
}
