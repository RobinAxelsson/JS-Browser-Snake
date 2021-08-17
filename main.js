import { Game } from "./Game.js"
import { GameGraphics } from "./GameGraphics.js"
import { SNAKE_SPEED } from "./Const.js";

const board = document.getElementById("game-board");
const game = new Game();
const graphics = new GameGraphics(game.getSnakeCoords, game.getFoodCoords, board);
let lastRenderTime = 0;
function gameLoop(currentTime) {
    if(game.gameOver === true){
        return
    }
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender > 1 / SNAKE_SPEED){
        lastRenderTime = currentTime
        game.tick();
        graphics.refresh();
    }
    window.requestAnimationFrame(gameLoop);
}
gameLoop()