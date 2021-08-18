import { X_TILES, Y_TILES } from "./Const.js";
import { renderTestField } from "./test.js";

export class GameGraphics {
  /** 
     * @typedef {function(): [[number]]} pieceGetter * /
     
    /* @param {pieceGetter} getSnakeFunc gets coordinates for snake body.
     * @param {pieceGetter} getFoodFunc gets coordinates for food.
     * @param {HTMLDivElement} gameBoard is the gameboard where pieces get rendered.
     */
  constructor(getSnakeFunc, getFoodFunc, gameBoard) {
    gameBoard.style.setProperty(
      "grid-template-rows",
      `repeat(${Y_TILES}, 1fr)`
    );
    gameBoard.style.setProperty(
      "grid-template-columns",
      `repeat(${X_TILES}, 1fr)`
    );
    this.getSnakeFunc = getSnakeFunc;
    this.getFoodFunc = getFoodFunc;
    this.gameBoard = gameBoard;
  }
  /**
   * @param {string} styleClass css class of element to render
   * @param {[number]} coords list of part coordinates
   */
  __drawPiece(styleClass, coords) {
    const gameEl = document.createElement("div");
    gameEl.style.gridColumnStart = coords[0] + 1;
    gameEl.style.gridRowStart = coords[1] + 1;
    gameEl.classList.add(styleClass);
    this.gameBoard.appendChild(gameEl);
  }
  __drawSnake() {
    this.getSnakeFunc().forEach((part) => {
      this.__drawPiece("snake", part);
    });
  }
  refresh() {
    this.gameBoard.innerHTML = "";
    renderTestField();
    this.__drawSnake();
    if (this.getFoodFunc().length !== 0)
      this.__drawPiece("food", this.getFoodFunc()[0]);
  }
}
