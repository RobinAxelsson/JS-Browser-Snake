import { Game } from "./Game.js";
import { GameGraphics } from "./GameGraphics.js";
import { SNAKE_SPEED, Y_TILES, X_TILES } from "./Const.js";
import { Control } from "./Control.js";
import { renderTestField } from "./test.js";

const board = document.getElementById("game-board");
renderTestField();

const game = new Game();
const graphics = new GameGraphics(
  game.getSnakeCoords,
  game.getFoodCoords,
  board
);
let lastRenderTime = 0;
let control = new Control(game.snake, "ArrowLeft", "ArrowRight");
document.addEventListener("keydown", (e) => {
  control.onKeyPressEvent(e);
});
function gameLoop(currentTime) {
  if (game.gameOver === true) return;
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender > 1 / SNAKE_SPEED) {
    lastRenderTime = currentTime;
    game.tick();
    graphics.refresh();
  }
  window.requestAnimationFrame(gameLoop);
}
gameLoop();

//KeyboardEvent {isTrusted: true, key: "ArrowDown", code: "ArrowDown", location: 0, ctrlKey: false, …}
