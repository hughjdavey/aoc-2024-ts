import { Day1 } from '../src/days/day1.ts';

const day1 = new Day1(1);

test('part one', () => {
  expect(day1.partOne()).toEqual(11);
});

test('part two', () => {
  expect(day1.partTwo()).toEqual(31);
});

test('parse input', () => {
  expect(day1.extractLists()).toEqual({
    a: [3, 4, 2, 1, 3, 3],
    b: [4, 3, 5, 3, 9, 3],
  });
});

test('pair by size', () => {
  expect(day1.pairBySize(day1.extractLists())).toEqual([
    { a: 1, b: 3 },
    { a: 2, b: 3 },
    { a: 3, b: 3 },
    { a: 3, b: 4 },
    { a: 3, b: 5 },
    { a: 4, b: 9 },
  ]);
});
