import { Day } from '../day.ts';
import { Grid } from '../../shared/grid.ts';
import { Coord } from '../../shared/coords.ts';
import { allPairs } from '../../shared/utils.ts';

export class Day8 extends Day {
  partOne(): unknown {
    return this.getUniqueAntinodes();
  }

  partTwo(): unknown {
    return this.getUniqueAntinodes(true);
  }

  getUniqueAntinodes(ignoreDistance: boolean = false): number {
    return new Set(
      Object.values(this.getAntinodes(new Grid(this.inputList), ignoreDistance))
        .flat()
        .map(coord => coord.toString()),
    ).size;
  }

  getAntinodes(grid: Grid, ignoreDistance: boolean = false): { [char: string]: Coord[] } {
    const antennas = Object.groupBy(
      grid.getCoords(char => char !== '.'),
      ({ char }) => char,
    );
    const frequencies = Object.keys(antennas);
    return frequencies.reduce<{ [char: string]: Coord[] }>((antinodes, frequency) => {
      const coords = (antennas[frequency] || []).map(square => square.coord);
      allPairs(coords).forEach(pair => {
        const existing = antinodes[frequency] || [];
        if (ignoreDistance) {
          existing.push(pair[0]);
        }
        antinodes[frequency] = [...existing, ...this.getAntinodesForPair(grid, pair, ignoreDistance)];
      });
      return antinodes;
    }, {});
  }

  getAntinodesForPair(grid: Grid, [c1, c2]: Coord[], ignoreDistance: boolean = false): Coord[] {
    const diff = c1.diff(c2);
    const antinodes = [];
    let antinode = c1.plusX(diff.x).plusY(diff.y);
    while (grid.isInBounds(antinode)) {
      antinodes.push(antinode);
      antinode = antinode.plusX(diff.x).plusY(diff.y);
    }
    return ignoreDistance ? antinodes : antinodes.slice(0, 1);
  }
}
