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
  let snake = new Snake(0, 0, Direction.Up, 3, "green");
  expect(snake.getBody()).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
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
test("Bodycoordinates of direction.left", () => {
  let snake = new Snake(0, 0, Direction.Left, 3, "green");
  expect(snake.getBody()).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});
