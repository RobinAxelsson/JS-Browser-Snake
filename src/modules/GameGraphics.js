import { Board } from "./Board";

export class GameGraphics {
  /**
   * @param {Board} board
   * @param {HTMLDivElement} htmlBoard is the gameboard where pieces get rendered.
   */
  constructor(board, htmlBoard) {
    htmlBoard.style.setProperty(
      "grid-template-columns",
      `repeat(${max_x + 1}, 1fr)`
    );
    htmlBoard.style.setProperty(
      "grid-template-rows",
      `repeat(${board.max_y + 1}, 1fr)`
    );
    this.pieceFuncs = pieceFuncs;
    this.gameBoard = htmlBoard;
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
  __drawAll(pieceFuncs) {
    pieceFuncs.forEach((func) => {
      let pieces = func();
      pieces.forEach((p) => {
        this.__drawPiece(p.style, p.coords);
      });
    });
  }
  refresh(pieceFuncs) {
    this.gameBoard.innerHTML = "";
    this.__drawAll(pieceFuncs);
  }
}
