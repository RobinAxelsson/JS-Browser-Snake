export class GameGraphics {
    /** 
     * @typedef {function(): [[number]]} pieceGetter * /
     
    /* @param {pieceGetter} getSnakeFunc gets coordinates for snake body.
     * @param {pieceGetter} getFoodFunc gets coordinates for food.
     * @param {HTMLDivElement} gameBoard is the gameboard where pieces get rendered.
     */
    constructor(getSnakeFunc, getFoodFunc, gameBoard) {
        this.getSnakeFunc = getSnakeFunc;
        this.getFoodFunc = getFoodFunc;
        this.gameBoard = gameBoard;
    }
    /**
     * @param {string} styleClass css class of element to render
     * @param {[number]} coords list of part coordinates 
     */
    __drawPiece(styleClass, coords) {
        const gameEl = document.createElement('div');
        gameEl.style.gridRowStart = coords[0];
        gameEl.style.gridColumnStart = coords[1];
        gameEl.classList.add(styleClass);
        this.gameBoard.appendChild(gameEl);
    }
    __drawSnake() {
        this.getSnakeFunc().forEach(part => {
            this.__drawPiece("snake", part);
        })
    }
    refresh() {
        this.gameBoard.innerHTML = "";
        this.__drawSnake();
        this.__drawPiece("food", this.getFoodFunc()[0])
    }
}
// function draw(x, y) {
//     const bodyEl = document.createElement('div');
//     bodyEl.style.gridRowStart = x;
//     bodyEl.style.gridColumnStart = y;
//     bodyEl.classList
//     const gameBoard = document.getElementById("game-board");
//     gameBoard.appendChild(bodyEl);
// }