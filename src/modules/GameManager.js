import { Board } from "./Board";
import { Game } from "./Game";
import { GameGraphics } from "./GameGraphics";
import { Player } from "./Player";
export class GameManager {
  /**@param {import('./gamesettings').GameSettings} settings */
  constructor(settings) {
    this.settings = settings;
    this.game = {};
    this.players = [];
    this.board = new Board(
      settings.X_Tiles,
      settings.Y_Tiles,
      settings.SnakeLength
    );
    let htmlBoard = document.getElementById("game-board");
    this.graphics = new GameGraphics(board, htmlBoard);
  }
  /**@return {import('./gamesettings').GameSettings} settings */
  get settings() {
    return this.settings;
  }
  /**@return {Board} */
  get board() {
    return this.board;
  }
  /**@return {[Player]} */
  get players() {
    return this.players;
  }
  /**@return {Game} */
  get game() {
    return this.game;
  }
  /**@return {GameGraphics} */
  get graphics() {
    return this.graphics;
  }
  addPlayer(leftKey, rightKey, name) {
    let styleI = this.players.length + 1;
    let player = new Player(leftKey, rightKey, name, "snake-" + styleI);
    this.players.push(player);
  }
  createGame() {
    let board = this.board;
    let snakes = board.makeSnakes(this.players);
    this.game = new Game(this.endGame, board.getFreeSquare, snakes);
    document.addEventListener("keydown", (e) => {
      this.players.forEach((x) => x.onKeyPressEvent(e));
      this.onEnterKey(e);
    });
  }
  /**@param {KeyboardEvent} e */
  onEnterKey(e) {
    if (e.key === "Enter" && this.game.isRunning === false) {
      this.start();
    }
  }
  start() {
    let currentTime = 0;
    this.game.isRunning = true;
    this.gameLoop(currentTime)();
  }
  gameLoop(currentTime) {
    if (this.game.isRunning === true) return;
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender > 1 / this.settings.SnakeSpeed) {
      lastRenderTime = currentTime;
      this.game.tick();
      this.graphics.refresh();
    }
    window.requestAnimationFrame(gameLoop);
  }
  endGame(snake) {
    this.game.isRunning = false;
    let winner = this.players.filter((p) => p.snake === snake)[0];
    winner.incrementScore();
    this.game.snakes = this.board.makeSnakes(this.players);
  }
}
