import { Game } from "../src/modules/Game";
const fs = require("fs");
const path = require("path");

const TEST_GAME = {
  X_Tiles: 5,
  Y_Tiles: 5,
  SnakeLength: 3,
  SnakeSpeed: 5,
  Snake: {
    x: 4,
    y: 0,
    direction: 0,
    style: "snake-1",
  },
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
  let snake = game.snake;
  snake.turnLeft();
  snake.turnLeft();
  game.tick();
  expect(game.gameOver).toBe(true);
});
