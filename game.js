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
        this.food = []

        this.snake = new Snake(this.rightEnd / 2, this.downEnd / 2, 2);
        this.coordGetters = []
        this.getSnakeCoords = this.snake.getBody
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
    Tick() {
        this.snake.move();
        if (this.food.length === 0) {
            this.spawnFood();
        }
        let head = this.snake.getHead();
        let food = this.food[0];
        if (head[0] === food[0] && head[1] === food[1]) {
            this.snake.grow();
            this.food.pop();
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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