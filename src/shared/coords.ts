import { range } from './utils.ts';

export const DIRECTIONS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'] as const;

export type Direction = (typeof DIRECTIONS)[number];

export class Coord {
  constructor(
    public x: number = 0,
    public y: number = 0,
  ) {
    this.x = x;
    this.y = y;
  }

  getNextNInDirection(n: number, direction: Direction): Coord[] {
    return new Array(n).fill(this).map((coord, index) => {
      const increment = index + 1;
      return new Coord(
        coord.x + (direction.includes('w') ? -increment : direction.includes('e') ? increment : 0),
        coord.y + (direction.includes('n') ? -increment : direction.includes('s') ? increment : 0),
      );
    });
  }

  getAdjacent(includeDiagonals: boolean): Coord[] {
    return range(-1, 1)
      .flatMap(dy => range(-1, 1).map(dx => new Coord(this.x + dx, this.y + dy)))
      .filter(coord => coord !== this)
      .filter(coord => includeDiagonals || coord.x == this.x || coord.y == this.y);
  }

  plusX(delta: number): Coord {
    return new Coord(this.x + delta, this.y);
  }

  minusX(delta: number): Coord {
    return new Coord(this.x - delta, this.y);
  }

  plusY(delta: number): Coord {
    return new Coord(this.x, this.y + delta);
  }

  minusY(delta: number): Coord {
    return new Coord(this.x, this.y - delta);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
