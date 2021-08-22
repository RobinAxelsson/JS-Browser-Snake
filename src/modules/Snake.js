import { X_TILES, Y_TILES } from "./Const.js";
import { Direction } from "./Game.js";

export class Snake {
  /**
   * @param {number} x Headposition x integer
   * @param {number} y Headposition y integer
   * @param {number} direction Where the snake is going, Direction enum/integer 0-3
   * @param {number} length How many bodyparts at startup.
   */
  constructor(x, y, length) {
    this.direction = Direction.Up;
    this.body = [];
    for (let i = 0; i < length; i++) {
      this.body.push([x, y + i]);
    }
    this.info();
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
    let headX = this.body[0][0];
    let headY = this.body[0][1];
    let xydiff =
      this.direction === Direction.Right
        ? [1, 0]
        : this.direction === Direction.Left
        ? [-1, 0]
        : this.direction === Direction.Up
        ? [0, -1]
        : this.direction === Direction.Down
        ? [0, 1]
        : null;
    let newHead = [headX + xydiff[0], headY + xydiff[1]];
    this.body.pop();
    this.body.unshift(newHead);
    this.body.forEach((part) => {
      part[0] =
        part[0] > X_TILES - 1
          ? (part[0] -= X_TILES)
          : part[0] < 0
          ? (part[0] += X_TILES)
          : part[0];
      part[1] =
        part[1] > Y_TILES - 1
          ? (part[1] -= Y_TILES)
          : part[1] < 0
          ? (part[1] += Y_TILES)
          : part[1];
    });
  }
  getBody = () => this.body;
  getHead = () => this.body[0];
}
