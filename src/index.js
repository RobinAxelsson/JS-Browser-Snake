import { Game } from "./modules/Game.js";
import { GameGraphics } from "./modules/GameGraphics.js";
import { SNAKE_SPEED } from "./modules/Const.js";
import { Control } from "./modules/Control.js";
import { renderTestField } from "./modules/coordmap.js";
import { DEFAULT_GAME } from "./modules/gamesettings.js";

const board = document.getElementById("game-board");
renderTestField();

const game = new Game(DEFAULT_GAME);
const graphics = new GameGraphics(
  [game.getSnakePieces, game.getFoodPieces],
  board,
  DEFAULT_GAME.X_Tiles,
  DEFAULT_GAME.Y_Tiles
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
