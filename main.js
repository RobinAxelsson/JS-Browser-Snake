import {
    Game
} from "./game.js"
import {
    GameGraphics
} from "./draw.js"

/**
 * @param {string} test fffff
 */
let test;
const board = document.getElementById("game-board");
const game = new Game([0, 0], [20, 20]);
const graphics = new GameGraphics(game.getSnakeCoords, game.getFoodCoords, board);
const SNAKE_SPD = 5;
let lastRenderTime = 0;
function gameLoop(currentTime) {
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender > 1 / SNAKE_SPD){
        lastRenderTime = currentTime
        game.Tick();
        graphics.refresh();
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);