import {
    Game
} from "./game.js"
import {
    GameGraphics
} from "./draw.js"
var board = document.getElementById("game-board");
var game = new Game([0, 0], [21, 21]);
var graphics = new GameGraphics(game.getSnakeCoords, game.getFoodCoords, board);
graphics.refresh();
game.Tick();