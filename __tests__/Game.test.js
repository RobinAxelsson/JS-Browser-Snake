import { Game } from "../src/modules/Game";
const fs = require("fs");
const path = require("path");

const TEST_GAME = {
  X_Tiles: 5,
  Y_Tiles: 5,
  SnakeLength: 3,
  SnakeSpeed: 5,
  Snakes: [
    {
      x: 4,
      y: 0,
      direction: 0,
      style: "snake-1",
    },
  ],
};
test("Instantiating game", () => {
  let game = new Game(TEST_GAME);
  let out = JSON.stringify(game, null, 2);
  let filePath = path.join(__dirname, "SnapShots", "game.test1.txt");
  let fileText;
  fs.readFile(filePath, "utf8", (err, target) => {
    if (err) {
      console.error(err);
      return;
    }
    fileText = target;
  });
  //expect(out).toStrictEqual(fileText);
  fs.writeFile(filePath, out, (err) => err);
});

test("Game Over", () => {
  let game = new Game(TEST_GAME);
  let snake = game.snakes[0];
  snake.turnLeft();
  snake.turnLeft();
  game.tick();
  expect(game.gameOver).toBe(true);
});

const TEST_GAME_2Player = {
  X_Tiles: 5,
  Y_Tiles: 5,
  SnakeLength: 2,
  SnakeSpeed: 5,
  Snakes: [
    {
      x: 1,
      y: 0,
      direction: 1,
      style: "snake-1",
    },
    {
      x: 1,
      y: 1,
      direction: 1,
      style: "snake-1",
    },
  ],
};
test("2 player instance", () => {
  let game = new Game(TEST_GAME_2Player);
  let snake1 = game.snakes[0];
  let snake2 = game.snakes[1];
  expect(snake1.getBody()).toStrictEqual([
    [1, 0],
    [0, 0],
  ]);
  expect(snake2.getBody()).toStrictEqual([
    [1, 1],
    [0, 1],
  ]);
});
test("2 player instance", () => {
  let game = new Game(TEST_GAME_2Player);
  let snake2 = game.snakes[1];
  snake2.turnLeft();
  game.tick();
  expect(game.gameOver).toBe(true);
});
