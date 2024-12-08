import { Day3 } from './day3.ts';

const day3 = new Day3(3);

describe('day 3', () => {
  test('part one', () => {
    expect(day3.partOne()).toEqual(161);
  });

  test('part two', () => {
    expect(day3.partTwo()).toEqual(48);
  });

  test('get commands', () => {
    expect(day3.getCommands("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")).toEqual([
      { a: 2, b: 4 },
      false,
      { a: 5, b: 5 },
      { a: 11, b: 8 },
      true,
      { a: 8, b: 5 },
    ]);
  });
});
