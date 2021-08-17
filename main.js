import {
    Game
} from "./game.js"
import {
    GameGraphics
} from "./draw.js"
import { X_TILES, Y_TILES } from "./const.js";

const board = document.getElementById("game-board");
board.style.setProperty("grid-template-rows", `repeat(${Y_TILES}, 1fr)`);
board.style.setProperty("grid-template-columns", `repeat(${X_TILES}, 1fr)`);
const game = new Game([0, 0], [X_TILES-1, Y_TILES-1]);
const graphics = new GameGraphics(game.getSnakeCoords, game.getFoodCoords, board);
const SNAKE_SPD = 5;
let lastRenderTime = 0;
function gameLoop(currentTime) {
    if(game.gameOver === true){
        return
    }
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender > 1 / SNAKE_SPD){
        lastRenderTime = currentTime
        game.tick();
        graphics.refresh();
    }
    window.requestAnimationFrame(gameLoop);
}
gameLoop()