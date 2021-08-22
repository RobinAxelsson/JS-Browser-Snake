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
