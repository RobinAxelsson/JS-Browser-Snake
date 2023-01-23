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
      x: 17,
      y: 15,
      direction: 3,
      style: "snake-2",
      leftKey: "z",
      rightKey: "x",
    },
    {
      x: 17,
      y: 10,
      direction: 2,
      style: "snake-3",
      leftKey: "1",
      rightKey: "q",
    },
    {
      x: 3,
      y: 15,
      direction: 0,
      style: "snake-4",
      leftKey: "n",
      rightKey: "m",
    }
  ];