import { Day7 } from './day7.ts';

const day7 = new Day7(7);

test('part one', () => {
  expect(day7.partOne()).toEqual(3749);
});

test('part two', () => {
  expect(day7.partTwo()).toEqual(11387);
});

test('get possible equations', () => {
  expect(day7.getPossibleEquations([1, 2], ['+', '*'])).toEqual(
    expect.arrayContaining([
      [1, '+', 2],
      [1, '*', 2],
    ]),
  );

  expect(day7.getPossibleEquations([1, 2, 3], ['+', '*'])).toEqual(
    expect.arrayContaining([
      [1, '+', 2, '+', 3],
      [1, '+', 2, '*', 3],
      [1, '*', 2, '+', 3],
      [1, '*', 2, '*', 3],
    ]),
  );
});

test('evaluate', () => {
  expect(day7.evaluate([10, '*', 19])).toEqual(190);
  expect(day7.evaluate([81, '+', 40, '*', 27])).toEqual(3267);
  expect(day7.evaluate([81, '*', 40, '+', 27])).toEqual(3267);
  expect(day7.evaluate([11, '+', 6, '*', 16, '+', 20])).toEqual(292);

  expect(day7.evaluate([15, '||', 6])).toEqual(156);
  expect(day7.evaluate([6, '*', 8, '||', 6, '*', 15])).toEqual(7290);
  expect(day7.evaluate([17, '||', 8, '+', 14])).toEqual(192);
});
