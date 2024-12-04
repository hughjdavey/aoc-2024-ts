import { count, range } from './utils.ts';

test('count', () => {
  expect(count([1, 2, 3, 4], i => i % 2 === 0)).toEqual(2);
  expect(count([true, false, true, false], i => i)).toEqual(2);
});

test('range', () => {
  expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
  expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
});
