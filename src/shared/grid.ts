import { range } from './utils.ts';
import { Coord } from './coords.ts';

export type GridSquare = { coord: Coord; char: string };

export class Grid {
  private grid: GridSquare[];

  constructor(private inputList: string[]) {
    this.grid = range(0, this.inputList.length - 1).flatMap(y =>
      range(0, this.inputList[0].length - 1).map(x => ({
        coord: new Coord(x, y),
        char: this.inputList[new Coord(x, y).y][new Coord(x, y).x],
      })),
    );
  }

  isInBounds(coord: Coord): boolean {
    return coord.x >= 0 && coord.y >= 0 && coord.x < this.inputList[0].length && coord.y < this.inputList.length;
  }

  getChar(coord: Coord): string {
    return this.inputList[coord.y][coord.x];
  }

  getCoord(char: string): Coord {
    const match = this.grid.find(square => square.char === char);
    if (match === undefined) {
      throw new Error(`Unable to find char '${char}'`);
    }
    return match.coord;
  }

  getCoords(predicate: (char: string) => boolean): GridSquare[] {
    return this.grid.filter(square => predicate(square.char));
  }
}
