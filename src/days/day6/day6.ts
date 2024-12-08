import { Day } from '../day.ts';
import { Coord } from '../../shared/coords.ts';
import { Grid } from '../../shared/grid.ts';
import { range } from '../../shared/utils.ts';

export class Day6 extends Day {
  private map = new Grid(this.inputList);

  partOne(): unknown {
    const { guard } = this.patrol();
    return guard.getDistinctPositions();
  }

  // this works but takes a really long time
  partTwo(): unknown {
    const allIndices = range(0, this.inputList.length - 1).flatMap(y =>
      range(0, this.inputList[0].length - 1).map(x => new Coord(x, y)),
    );

    const p1GuardPositions = this.patrol().guard.history.map(state => state.position.toString());
    const indicesGuardTook = allIndices.filter(index => p1GuardPositions.includes(index.toString()));

    let count = 0;
    let i = 0;
    for (let index of indicesGuardTook) {
      console.warn(`${++i} of ${indicesGuardTook.length}`);
      const modifiedGrid = new Grid(this.gridWithObstruction(index));
      const { exitReason } = this.patrol(modifiedGrid as Grid);
      if (exitReason === 'loop') {
        count++;
      }
    }
    return count;
  }

  gridWithObstruction(coord: Coord): string[] {
    if (this.inputList[coord.y][coord.x] !== '.') {
      return this.inputList;
    }
    return this.inputList.map((row, rowIndex) => {
      if (coord.y !== rowIndex) {
        return row;
      } else {
        return row.substring(0, coord.x) + '#' + row.substring(coord.x + 1);
      }
    });
  }

  patrol(map: Grid = this.map): { guard: Guard; exitReason: 'end' | 'loop' } {
    const guard = new Guard(map, map.getCoord('^'), '^');
    while (true) {
      try {
        guard.move();
      } catch (e) {
        return { guard, exitReason: e?.message };
      }
    }
  }
}

type GuardDirection = '^' | '<' | 'v' | '>';

type GuardState = { position: Coord; direction: GuardDirection };

export class Guard {
  constructor(
    private map: Grid,
    public position: Coord,
    public direction: GuardDirection,
    public history: GuardState[] = [{ position, direction }],
  ) {}

  move(): GuardState {
    const nextPosition = this.naiveNextPosition();

    if (!this.map.isInBounds(nextPosition)) {
      throw new Error('end');
    }

    if (this.map.getChar(nextPosition) !== '#') {
      this.position = nextPosition;
      if (this.history.map(state => `${state.position.toString()}-${state.direction}`).includes(this.toString())) {
        throw new Error('loop');
      }
      this.history.push({ position: this.position, direction: this.direction });
    } else {
      this.direction = this.direction === '^' ? '>' : this.direction === '>' ? 'v' : this.direction === 'v' ? '<' : '^';
    }

    return { position: this.position, direction: this.direction };
  }

  private naiveNextPosition(): Coord {
    return this.direction === '^'
      ? this.position.minusY(1)
      : this.direction === '<'
        ? this.position.minusX(1)
        : this.direction === 'v'
          ? this.position.plusY(1)
          : this.position.plusX(1);
  }

  toString(): string {
    return `${this.position.toString()}-${this.direction}`;
  }

  getDistinctPositions(): number {
    return new Set(this.history.map(state => state.position.toString())).size;
  }
}
