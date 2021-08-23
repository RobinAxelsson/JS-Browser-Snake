import { Direction } from "./Direction.js";

export class Snake {
  /**
   * @param {number} x Headposition x integer
   * @param {number} y Headposition y integer
   * @param {number} direction Where the snake is going, Direction enum/integer 0-3
   * @param {number} length How many bodyparts at startup.
   * @param {string} style snake style
   */
  constructor(x, y, direction, length, style) {
    this.direction = direction;
    this.style = style;
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
  move() {
    let newHead = Direction.transform(this.direction, this.body[0]);
    this.body.pop();
    this.body.unshift(newHead);
  }
  getBody = () => this.body;
  getHead = () => this.body[0];
}
