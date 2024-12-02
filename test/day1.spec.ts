import { Day1 } from '../src/days/day1.ts';

const day1 = new Day1(1);

describe('day 1', () => {

  test('part one', () => {
    expect(day1.partOne()).toEqual('THIS IS');
  });

  test('part two', () => {
    const partTwo = day1.partTwo();
    expect(partTwo).toBeDefined();
    expect(partTwo).toHaveLength(4);
    expect(partTwo).toEqual(expect.stringContaining('I'));
    expect(partTwo).toEqual('FILE');
  });
});
