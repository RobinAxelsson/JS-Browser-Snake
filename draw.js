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
     * 
     * @param {string} styleClass css class of element to render
     * @param {[[number]]} coords list of part coordinates 
     */
    __draw(styleClass, coords) {
        coords.forEach(part => {
            const gameEl = document.createElement('div');
            gameEl.style.gridRowStart = part[0];
            gameEl.style.gridColumnStart = part[1];
            gameEl.classList.add(styleClass);
            this.gameBoard.appendChild(gameEl);
        })
    }
    refresh() {
        this.__draw("snake", this.getSnakeFunc());
        this.__draw("food", this.getFoodFunc())
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