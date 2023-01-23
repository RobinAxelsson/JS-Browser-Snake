import { Game } from "./modules/Game.js";
import { GameGraphics } from "./modules/GameGraphics.js";
import { SNAKE_SPEED } from "./modules/Const.js";
import { Control } from "./modules/Control.js";
import { renderGameBoard } from "./modules/coordmap.js";
import { DEFAULT_GAME, SNAKES } from "./modules/gamesettings.js";

const board = document.getElementById("game-board");
const addPlayerBtn = document.getElementById("add-player-btn");
const removePlayerBtn = document.getElementById("remove-player-btn");
let iPlayers = 1;
addPlayerBtn.onclick = () => {
  removePlayerBtn.style.display = "inline-block";
  iPlayers += 1; 
  document.getElementById("controls-" + iPlayers).style.display = "block";
  if(iPlayers == 4){
    addPlayerBtn.style.display = "none";
  }
}

removePlayerBtn.onclick = () => {
  addPlayerBtn.style.display = "inline-block";
  document.getElementById("controls-" + iPlayers).style.display = "none";
  iPlayers -= 1; 
  if(iPlayers == 1) removePlayerBtn.style.display = "none";
}

const startBtn = document.getElementById("start-game-btn");
const quitGameBtn = document.getElementById("quit-game-btn");
let endGame = false;
startBtn.onclick = () => {
  renderGameBoard();
  createGame();
  gameLoop();
  startBtn.innerText = "Restart";
  quitGameBtn.style.display = "inline-block";
}

quitGameBtn.onclick = () => {
  startBtn.innerText = "New Game";
  quitGameBtn.style.display = "none";
  endGame = true;
}

let lastRenderTime = 0;
let game;
let graphics;
function createGame(){
  endGame = false;
  lastRenderTime = 0;
  game = new Game(DEFAULT_GAME, SNAKES.slice(0,iPlayers));
  graphics = new GameGraphics(
    [game.getSnakePieces, game.getFoodPieces],
    board,
    DEFAULT_GAME.X_Tiles,
    DEFAULT_GAME.Y_Tiles
  );
  const controls = game.snakes.map((snake) => new Control(snake));
  document.addEventListener("keydown", (e) => {
    controls.forEach((c) => c.onKeyPressEvent(e));
  });
}

function gameLoop(currentTime) {
  if (game.gameOver === true) return;
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender > 1 / SNAKE_SPEED) {
    lastRenderTime = currentTime;
    game.tick();
    graphics.refresh();
  }

  if(endGame){
    return;
  }

  window.requestAnimationFrame(gameLoop);
}
