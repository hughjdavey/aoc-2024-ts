import { Day8 } from '../src/days/day8.ts';
import { Grid } from '../src/shared/grid.ts';
import { Coord } from '../src/shared/coords.ts';

const day8 = new Day8(8);

test('part one', () => {
  expect(day8.partOne()).toEqual(14);
});

test('part two', () => {
  expect(day8.partTwo()).toEqual(34);
});

test('get antinodes', () => {
  expect(
    day8.getAntinodes(
      new Grid([
        '..........',
        '..........',
        '..........',
        '....a.....',
        '..........',
        '.....a....',
        '..........',
        '..........',
        '..........',
        '..........',
      ]),
    ).a,
  ).toEqual(expect.arrayContaining([new Coord(3, 1), new Coord(6, 7)]));

  expect(
    day8.getAntinodes(
      new Grid([
        '..........',
        '..........',
        '..........',
        '....a.....',
        '........a.',
        '.....a....',
        '..........',
        '..........',
        '..........',
        '..........',
      ]),
    ).a,
  ).toEqual(expect.arrayContaining([new Coord(3, 1), new Coord(6, 7), new Coord(0, 2), new Coord(2, 6)]));

  expect(
    day8.getAntinodes(
      new Grid([
        'T.........',
        '...T......',
        '.T........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
      ]),
      true,
    ).T,
  ).toEqual(
    expect.arrayContaining([
      // #s
      new Coord(5, 0),
      new Coord(6, 2),
      new Coord(9, 3),
      new Coord(2, 4),
      new Coord(3, 6),
      new Coord(4, 8),
      // Ts
      new Coord(0, 0),
      new Coord(3, 1),
      new Coord(1, 2),
    ]),
  );
});
