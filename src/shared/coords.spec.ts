import { Coord } from './coords.ts';

test('get next n in direction', () => {
  expect(new Coord(0, 0).getNextNInDirection(4, 'e')).toEqual([
    new Coord(1, 0),
    new Coord(2, 0),
    new Coord(3, 0),
    new Coord(4, 0),
  ]);

  expect(new Coord(0, 0).getNextNInDirection(4, 'ne')).toEqual([
    new Coord(1, -1),
    new Coord(2, -2),
    new Coord(3, -3),
    new Coord(4, -4),
  ]);

  expect(new Coord(0, 0).getNextNInDirection(4, 'sw')).toEqual([
    new Coord(-1, 1),
    new Coord(-2, 2),
    new Coord(-3, 3),
    new Coord(-4, 4),
  ]);

  expect(new Coord(0, 0).getNextNInDirection(4, 's')).toEqual([
    new Coord(0, 1),
    new Coord(0, 2),
    new Coord(0, 3),
    new Coord(0, 4),
  ]);
});

test('get adjacent', () => {
  expect(new Coord(0, 0).getAdjacent(false)).toEqual(
    expect.arrayContaining([new Coord(-1, 0), new Coord(0, -1), new Coord(1, 0), new Coord(0, 1)]),
  );

  expect(new Coord(0, 0).getAdjacent(true)).toEqual(
    expect.arrayContaining([
      new Coord(-1, 0),
      new Coord(-1, -1),
      new Coord(0, -1),
      new Coord(1, -1),
      new Coord(1, 0),
      new Coord(1, 1),
      new Coord(0, 1),
      new Coord(-1, 1),
    ]),
  );
});
