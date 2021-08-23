/**
 * @typedef {Object} SnakeData
 * @property {number} x
 * @property {number} y
 * @property {number} direction
 * @property {string} style
 */
/**
 * @typedef {Object} GameSettings
 * @property {number} X_Tiles
 * @property {number} Y_Tiles
 * @property {number} SnakeLength
 * @property {number} SnakeSpeed
 * @property {[SnakeData]} Snakes
 */
/** @type {GameSettings} */
export const DEFAULT_GAME = {
  X_Tiles: 21,
  Y_Tiles: 21,
  SnakeLength: 3,
  SnakeSpeed: 5,
  Snakes: [
    {
      x: 3,
      y: 10,
      direction: 1,
      style: "snake-1",
      leftKey: "ArrowLeft",
      rightKey: "ArrowRight",
    },
    {
      x: 17,
      y: 10,
      direction: 2,
      style: "snake-2",
      leftKey: "q",
      rightKey: "e",
    },
  ],
};
