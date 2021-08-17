import { X_TILES, Y_TILES } from "./const.js";

export class Game {
    /**
     * @param {[number, number]} startXY 
     * @param {[number, number]} endXY 
     */
    constructor(startXY, endXY) {
        this.leftEnd = startXY[0];
        this.topEnd = startXY[1];
        this.rightEnd = endXY[0];
        this.downEnd = endXY[1];
        this.food = [];
        this.gameOver = false;

        this.snake = new Snake(this.rightEnd / 2, this.downEnd / 2, 3);
        this.coordGetters = []
        this.getSnakeCoords = this.snake.getBody;
    }
    getFoodCoords = () => this.food
    spawnFood() {
        let onSnake = true;
        let body = this.snake.getBody();
        let randX = 0;
        let randY = 0;
        while (onSnake) {
            randX = getRandomInt(this.leftEnd, this.rightEnd);
            randY = getRandomInt(this.topEnd, this.downEnd);
            if (body.filter(coord => coord[0] === randX && coord[1] === randY).length === 0) onSnake = false;
        }
        this.food.push([randX, randY]);
    }
    tick() {
        this.snake.move();
        if (this.food.length === 0) {
            this.spawnFood();
        }
        let status = this.snakeStatus();
        if (status === Head.Wall){
            this.gameOver = true;
            return
        }
        if (status === Head.Food) {
            this.snake.grow();
            this.food.pop();
        }
    }
    snakeStatus = () => Head.getPosition(this.snake, this.food);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
class Head{
    static Free = 0
    static Food = 1
    static Wall = 2
    /**
     * @param {Snake} snake 
     * @param {[[number]]} food
     * */
    static getPosition(snake, food){
        let head = snake.getHead();
        let x = head[0];
        let y = head[1];
        if(x < 0 || x >= X_TILES) return Head.Wall;
        if(y < 0 || y >= Y_TILES) return Head.Wall;
        let fx = food[0][0];
        let fy = food[0][1];
        if(x === fx && y === fy) return Head.Food;
        return Head.Free;
    }
}
class Direction {
    static Up = 0
    static Right = 1
    static Down = 2
    static Left = 3
    static turnRight(currentDirection) {
        if (currentDirection < 3) return currentDirection + 1;
        if (currentDirection == 3) return 0;
        else throw 'direction can only be 0-3'
    }
    static turnLeft(currentDirection) {
        if (currentDirection > 0) return currentDirection - 1;
        if (currentDirection == 0) return 3;
        else throw 'direction can only be 0-3'
    }
}
class Snake {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} direction 
     * @param {number} length 
     */
    constructor(x, y, length) {
        x = Math.floor(x);
        y = Math.floor(y);
        this.direction = Direction.Up
        this.body = []
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
        this.body.unshift(newHead)
    }
    getBody = () => this.body;
    getHead = () => this.body[0];
}