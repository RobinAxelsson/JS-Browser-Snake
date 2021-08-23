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
 * @property {SnakeData} Snake
 */
/** @type {GameSettings} */
export const DEFAULT_GAME = {
  X_Tiles: 21,
  Y_Tiles: 21,
  SnakeLength: 3,
  SnakeSpeed: 5,
  Snake: {
    x: 10,
    y: 10,
    direction: 0,
    style: "snake-1",
  },
};
