export class Direction {
  static Up = 0;
  static Right = 1;
  static Down = 2;
  static Left = 3;
  static toString(d) {
    return d === 0
      ? "Up"
      : d === 1
      ? "Right"
      : d === 2
      ? "Down"
      : d === 3
      ? "Left"
      : null;
  }
  /**
   * @param {number} direction
   * @param {[number]} coord
   * @returns {[number]}
   */
  static transform(direction, coord) {
    let X = coord[0];
    let Y = coord[1];
    let xydiff =
      direction === Direction.Right
        ? [1, 0]
        : direction === Direction.Left
        ? [-1, 0]
        : direction === Direction.Up
        ? [0, -1]
        : direction === Direction.Down
        ? [0, 1]
        : null;
    return [X + xydiff[0], Y + xydiff[1]];
  }
  /**
   * @param {number} direction
   * @param {[number]} coord
   * @returns {[number]}
   */
  static transformReverse(direction, coord) {
    direction = Direction.turnRight(direction);
    let directionReverse = Direction.turnRight(direction);
    return Direction.transform(directionReverse, coord);
  }
  /**
   * @param {number} currentDirection
   * @returns {number} newDirection
   */
  static turnRight(currentDirection) {
    if (currentDirection < 3) return currentDirection + 1;
    if (currentDirection == 3) return 0;
    else throw "direction can only be 0-3";
  }
  static turnLeft(currentDirection) {
    if (currentDirection > 0) return currentDirection - 1;
    if (currentDirection == 0) return 3;
    else throw "direction can only be 0-3";
  }
}
