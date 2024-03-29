import { X_TILES, Y_TILES } from "./Const.js";

export function renderGameBoard() {
  const board = document.getElementById("game-board");
  board.style.setProperty("grid-template-rows", `repeat(${Y_TILES}, 1fr)`);
  board.style.setProperty("grid-template-columns", `repeat(${X_TILES}, 1fr)`);
  for (let y = 0; y < Y_TILES; y++) {
    for (let x = 0; x < X_TILES; x++) {
      const square = document.createElement("div");
      square.style.gridRowStart = x + 1;
      square.style.gridColumnStart = y + 1;
      square.style.fontSize = "8px";
      board.appendChild(square);
    }
  }
}
