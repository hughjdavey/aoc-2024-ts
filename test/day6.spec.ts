import { Day6, Guard } from '../src/days/day6.ts';
import { Coord } from '../src/shared/coords.ts';
import { Grid } from '../src/shared/grid.ts';
import { range } from '../src/shared/utils.ts';

const NORMAL_MAP = [
  '....#.....',
  '.........#',
  '..........',
  '..#.......',
  '.......#..',
  '..........',
  '.#..^.....',
  '........#.',
  '#.........',
  '......#...',
];

const day6 = new Day6(6);

test('part one', () => {
  expect(day6.partOne()).toEqual(41);
});

test('part two', () => {
  expect(day6.partTwo()).toEqual(6);
});

test('guard move', () => {
  const map = new Grid(NORMAL_MAP);
  expect(new Guard(map, new Coord(4, 2), '^').move()).toEqual({ position: new Coord(4, 1), direction: '^' });
  expect(new Guard(map, new Coord(4, 2), '>').move()).toEqual({ position: new Coord(5, 2), direction: '>' });
  expect(new Guard(map, new Coord(4, 2), 'v').move()).toEqual({ position: new Coord(4, 3), direction: 'v' });
  expect(new Guard(map, new Coord(4, 2), '<').move()).toEqual({ position: new Coord(3, 2), direction: '<' });

  expect(new Guard(map, new Coord(4, 1), '^').move()).toEqual({ position: new Coord(4, 1), direction: '>' });
  expect(new Guard(map, new Coord(4, 1), '>').move()).toEqual({ position: new Coord(5, 1), direction: '>' });
  expect(new Guard(map, new Coord(8, 1), '>').move()).toEqual({ position: new Coord(8, 1), direction: 'v' });
  expect(new Guard(map, new Coord(8, 1), 'v').move()).toEqual({ position: new Coord(8, 2), direction: 'v' });
});

test('loop detection', () => {
  expect(day6.patrol(new Grid(NORMAL_MAP)).exitReason).toEqual('end');
  expect(day6.patrol(new Grid(mapWithObstruction(new Coord(3, 6)))).exitReason).toEqual('loop');
  expect(day6.patrol(new Grid(mapWithObstruction(new Coord(6, 7)))).exitReason).toEqual('loop');
  expect(day6.patrol(new Grid(mapWithObstruction(new Coord(7, 7)))).exitReason).toEqual('loop');
  expect(day6.patrol(new Grid(mapWithObstruction(new Coord(1, 8)))).exitReason).toEqual('loop');
  expect(day6.patrol(new Grid(mapWithObstruction(new Coord(3, 8)))).exitReason).toEqual('loop');
  expect(day6.patrol(new Grid(mapWithObstruction(new Coord(7, 9)))).exitReason).toEqual('loop');
});

const mapWithObstruction = (index: Coord): string[] => {
  return range(0, NORMAL_MAP.length - 1).flatMap(y => {
    if (y !== index.y) {
      return NORMAL_MAP[y];
    }
    let modifiedRow = '';
    range(0, NORMAL_MAP[0].length - 1).map(x => {
      if (x === index.x && y === index.y) {
        modifiedRow += '#';
      } else {
        modifiedRow += NORMAL_MAP[y][x];
      }
    });
    return modifiedRow;
  });
};
