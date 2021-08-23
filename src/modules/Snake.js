import { Direction } from "./Direction.js";

export class Snake {
  /**
   * @param {number} x Headposition x integer
   * @param {number} y Headposition y integer
   * @param {number} direction Where the snake is going, Direction enum/integer 0-3
   * @param {number} length How many bodyparts at startup.
   * @param {string} color snake color
   */
  constructor(x, y, direction, length, color) {
    this.direction = direction;
    this.color = color;
    this.body = [];
    this.body.push([x, y]);
    for (let i = 0; i < length - 1; i++) {
      this.body[i + 1] = Direction.transformReverse(direction, this.body[i]);
    }
  }
  info() {
    console.log("Snake:");
    console.log(`Direction ${Direction.toString(this.direction)}`);
    console.log("Body:");
    this.body.forEach((p) => {
      console.log(`x:${p[0]}, y:${p[1]}`);
    });
  }
  turnLeft = () => (this.direction = Direction.turnLeft(this.direction));
  turnRight = () => (this.direction = Direction.turnRight(this.direction));
  grow() {
    let last = this.body[this.body.length - 1];
    this.body.push([last[0], last[1]]);
  }
  move(max_x, max_y) {
    let newHead = Direction.transform(this.direction, this.body[0]);
    this.body.pop();
    this.body.unshift(newHead);
    this.body.forEach((coord) => {
      coord[0] =
        coord[0] > max_x
          ? (coord[0] -= max_x + 1)
          : coord[0] < 0
          ? (coord[0] += max_x + 1)
          : coord[0];
      coord[1] =
        coord[1] > max_y
          ? (coord[1] -= max_y + 1)
          : coord[1] < 0
          ? (coord[1] += max_y + 1)
          : coord[1];
    });
    return this.body;
  }
  getBody = () => this.body;
  getHead = () => this.body[0];
}
