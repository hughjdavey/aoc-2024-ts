import { Day } from '../day.ts';
import { Coord, DIRECTIONS } from '../../shared/coords.ts';
import { count, range } from '../../shared/utils.ts';
import { GridSquare } from '../../shared/grid.ts';

export class Day4 extends Day {
  private grid: GridSquare[] = range(0, this.inputList.length - 1).flatMap(y =>
    range(0, this.inputList[0].length - 1).map(x => ({ coord: new Coord(x, y), char: this.getChar(new Coord(x, y)) })),
  );

  partOne(): unknown {
    const xs = this.grid.filter(square => square.char === 'X').map(square => square.coord);
    return xs.reduce((sum, x) => sum + this.getPossibleXmases(x), 0);
  }

  /*
    valid patterns

    M.S    M.M    S.S    S.M
    .A.    .A.    .A.    .A.
    M.S    S.S    M.M    S.M
 */
  partTwo(): unknown {
    return count(
      this.getGridSnapshots(),
      snapshot =>
        (snapshot[0] === 'M' &&
          snapshot[2] === 'S' &&
          snapshot[4] === 'A' &&
          snapshot[6] === 'M' &&
          snapshot[8] === 'S') ||
        (snapshot[0] === 'M' &&
          snapshot[2] === 'M' &&
          snapshot[4] === 'A' &&
          snapshot[6] === 'S' &&
          snapshot[8] === 'S') ||
        (snapshot[0] === 'S' &&
          snapshot[2] === 'S' &&
          snapshot[4] === 'A' &&
          snapshot[6] === 'M' &&
          snapshot[8] === 'M') ||
        (snapshot[0] === 'S' &&
          snapshot[2] === 'M' &&
          snapshot[4] === 'A' &&
          snapshot[6] === 'S' &&
          snapshot[8] === 'M'),
    );
  }

  getPossibleXmases(coord: Coord): number {
    const wordsFromCoord = DIRECTIONS.map(direction => {
      const fourLetterWord = [coord, ...coord.getNextNInDirection(3, direction)];
      if (fourLetterWord.every(letter => this.isInBounds(letter))) {
        return fourLetterWord.map(letter => this.getChar(letter)).join('');
      }
    });
    return count(wordsFromCoord, word => word === 'XMAS');
  }

  // get all 3x3 squares within the grid as strings so we can check for X-MAS patterns
  getGridSnapshots(): string[] {
    const maxX = this.inputList[0].length - 3;
    const maxY = this.inputList.length - 3;
    const coords = this.grid
      .filter(square => square.coord.x <= maxX && square.coord.y <= maxY)
      .map(square => square.coord);
    return coords.map(coord =>
      [
        new Coord(coord.x, coord.y),
        new Coord(coord.x + 1, coord.y),
        new Coord(coord.x + 2, coord.y),
        new Coord(coord.x, coord.y + 1),
        new Coord(coord.x + 1, coord.y + 1),
        new Coord(coord.x + 2, coord.y + 1),
        new Coord(coord.x, coord.y + 2),
        new Coord(coord.x + 1, coord.y + 2),
        new Coord(coord.x + 2, coord.y + 2),
      ]
        .map(coord => this.getChar(coord))
        .join(''),
    );
  }

  private isInBounds(coord: Coord): boolean {
    return coord.x >= 0 && coord.y >= 0 && coord.x < this.inputList[0].length && coord.y < this.inputList.length;
  }

  private getChar(coord: Coord): string {
    return this.inputList[coord.y][coord.x];
  }
}
