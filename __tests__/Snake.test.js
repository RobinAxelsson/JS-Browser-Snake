import { Board } from "../src/modules/Board";
import { Direction } from "../src/modules/Direction";
import { Snake } from "../src/modules/Snake";

test("Turning right", () => {
  let snake = new Snake(0, 0, Direction.Up, 3, "green");
  snake.turnRight();
  snake.turnRight();
  expect(snake.direction).toBe(Direction.Down);
});
test("Turning left", () => {
  let snake = new Snake(0, 0, Direction.Right, 3, "green");
  snake.turnLeft();
  snake.turnLeft();
  expect(snake.direction).toBe(Direction.Left);
});
test("Bodycoordinates of snake direction.up", () => {
  let snake = new Snake(1, 0, Direction.Up, 3, "green");
  expect(snake.getBody()).toStrictEqual([
    [1, 0],
    [1, 1],
    [1, 2],
  ]);
});
test("moving snake", () => {
  let snake = new Snake(0, 1, Direction.Up, 3, "green");
  snake.move();
  snake.turnRight();
  snake.move();
  expect(snake.getBody()).toStrictEqual([
    [1, 0],
    [0, 0],
    [0, 1],
  ]);
});
test("moving snake three steps", () => {
  let snake = new Snake(1, 1, Direction.Down, 3, "green");
  snake.move(10, 10);
  snake.move(10, 10);
  snake.move(10, 10);

  expect(snake.getBody()).toStrictEqual([
    [1, 4],
    [1, 3],
    [1, 2],
  ]);
});
test("moving snake three steps up from middle", () => {
  let snake = new Snake(10, 10, Direction.Up, 3, "green");
  snake.move(20, 20);
  snake.move(20, 20);
  snake.move(20, 20);

  expect(snake.getBody()).toStrictEqual([
    [10, 7],
    [10, 8],
    [10, 9],
  ]);
});
test("moving snake over edge", () => {
  let board = new Board(5, 3);
  let snake = new Snake(0, 0, Direction.Left, 1, "green");
  board.moveSnake(snake);
  expect(snake.getBody()).toStrictEqual([[4, 0]]);
});
test("moving snake over edge upwards", () => {
  let board = new Board(5, 6);
  let snake = new Snake(0, 0, Direction.Up, 1, "green");
  board.moveSnake(snake);
  expect(snake.getBody()).toStrictEqual([[0, 5]]);
});
test("Bodycoordinates of direction.left", () => {
  let snake = new Snake(0, 0, Direction.Left, 3, "green");
  expect(snake.getBody()).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});
test("Snake grow", () => {
  let snake = new Snake(0, 0, Direction.Left, 3, "green");
  snake.grow();
  expect(snake.getBody()).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 0],
  ]);
});
