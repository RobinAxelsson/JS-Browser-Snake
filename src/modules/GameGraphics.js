import { renderTestField } from "./coordmap.js";

export class GameGraphics {
  /**
   * @param {HTMLDivElement} gameBoard is the gameboard where pieces get rendered.
   */
  constructor(pieceFuncs, gameBoard, X_TILES, Y_TILES) {
    gameBoard.style.setProperty(
      "grid-template-rows",
      `repeat(${Y_TILES}, 1fr)`
    );
    gameBoard.style.setProperty(
      "grid-template-columns",
      `repeat(${X_TILES}, 1fr)`
    );
    this.pieceFuncs = pieceFuncs;
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
  __drawAll() {
    this.pieceFuncs.forEach((func) => {
      let pieces = func();
      pieces.forEach((p) => {
        this.__drawPiece(p.style, p.coords);
      });
    });
  }
  refresh() {
    this.gameBoard.innerHTML = "";
    renderTestField();
    this.__drawAll();
  }
}
