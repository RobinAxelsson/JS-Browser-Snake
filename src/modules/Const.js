export const SNAKE_SPEED = 6;
export const SNAKE_LENGTH = 5;
export const X_TILES = 41;
export const Y_TILES = 41;


/**
 * @typedef {Object} GameSettings
 * @property {number} X_Tiles
 * @property {number} Y_Tiles
 * @property {number} SnakeLength
 * @property {number} SnakeSpeed
 * @property {number} Foods
 */
/** @type {GameSettings} */
export const DEFAULT_GAME = {
    X_Tiles: X_TILES,
    Y_Tiles: Y_TILES,
    SnakeLength: SNAKE_LENGTH,
    SnakeSpeed: SNAKE_SPEED,
    Foods: 3
  };
  
  export const SNAKES = [
      {
        x: 3,
        y: 5,
        direction: 1,
        style: "snake-1",
        leftKey: "ArrowLeft",
        rightKey: "ArrowRight",
      },
      {
        x: 30,
        y: 30,
        direction: 3,
        style: "snake-2",
        leftKey: "z",
        rightKey: "x",
      },
      {
        x: 30,
        y: 3,
        direction: 2,
        style: "snake-3",
        leftKey: "1",
        rightKey: "q",
      },
      {
        x: 3,
        y: 30,
        direction: 0,
        style: "snake-4",
        leftKey: "n",
        rightKey: "m",
      }
    ];