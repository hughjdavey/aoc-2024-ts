import { Day5 } from './day5.ts';

const day5 = new Day5(5);

test('part one', () => {
  expect(day5.partOne()).toEqual(143);
});

test('part two', () => {
  expect(day5.partTwo()).toEqual(123);
});

test('is in right order', () => {
  expect(day5.isInRightOrder([75, 47, 61, 53, 29])).toEqual(true);
  expect(day5.isInRightOrder([97, 61, 53, 29, 13])).toEqual(true);
  expect(day5.isInRightOrder([75, 29, 13])).toEqual(true);
  expect(day5.isInRightOrder([75, 97, 47, 61, 53])).toEqual(false);
  expect(day5.isInRightOrder([61, 13, 29])).toEqual(false);
  expect(day5.isInRightOrder([97, 13, 75, 29, 47])).toEqual(false);
});

test('put in right order', () => {
  expect(day5.putInRightOrder([75, 97, 47, 61, 53])).toEqual([97, 75, 47, 61, 53]);
  expect(day5.putInRightOrder([61, 13, 29])).toEqual([61, 29, 13]);
  expect(day5.putInRightOrder([97, 13, 75, 29, 47])).toEqual([97, 75, 47, 29, 13]);
});
