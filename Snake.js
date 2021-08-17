import { Direction } from "./Game.js";

export class Snake {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} direction
     * @param {number} length
     */
    constructor(x, y, length) {
        x = Math.floor(x);
        y = Math.floor(y);
        this.direction = Direction.Up;
        this.body = [];
        for (let i = 0; i < length; i++) {
            this.body.push([x, y + i]);
        }
    }
    turnLeft = () => this.direction = Direction.turnLeft(this.direction);
    turnRight = () => this.direction = Direction.turnRight(this.direction);
    grow() {
        let last = this.body[this.body.length - 1];
        this.body.push([last[0], last[1]]);
    }
    move() {
        let headX = this.body[0][0];
        let headY = this.body[0][1];
        let xydiff = this.direction === Direction.Right ? [1, 0] :
            this.direction === Direction.Left ? [-1, 0] :
                this.direction === Direction.Up ? [0, -1] :
                    this.direction === Direction.Down ? [0, 1] :
                        null;
        let newHead = [headX + xydiff[0], headY + xydiff[1]];
        this.body.pop();
        this.body.unshift(newHead);
    }
    getBody = () => this.body;
    getHead = () => this.body[0];
}
