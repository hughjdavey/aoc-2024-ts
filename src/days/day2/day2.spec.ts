import { Day2, Report } from './day2.ts';

const day1 = new Day2(2);

describe('day 2', () => {
  test('part one', () => {
    expect(day1.partOne()).toEqual(2);
  });

  test('part two', () => {
    expect(day1.partTwo()).toEqual(4);
  });

  test('is report safe', () => {
    expect(new Report([7, 6, 4, 2, 1]).isSafe()).toEqual(true);
    expect(new Report([1, 2, 7, 8, 9]).isSafe()).toEqual(false);
    expect(new Report([9, 7, 6, 2, 1]).isSafe()).toEqual(false);
    expect(new Report([1, 3, 2, 4, 5]).isSafe()).toEqual(false);
    expect(new Report([8, 6, 4, 4, 1]).isSafe()).toEqual(false);
    expect(new Report([1, 3, 6, 7, 9]).isSafe()).toEqual(true);
  });

  test('is report safe with problem dampener', () => {
    expect(new Report([7, 6, 4, 2, 1]).isSafeWithProblemDampener()).toEqual(true);
    expect(new Report([1, 2, 7, 8, 9]).isSafeWithProblemDampener()).toEqual(false);
    expect(new Report([9, 7, 6, 2, 1]).isSafeWithProblemDampener()).toEqual(false);
    expect(new Report([1, 3, 2, 4, 5]).isSafeWithProblemDampener()).toEqual(true);
    expect(new Report([8, 6, 4, 4, 1]).isSafeWithProblemDampener()).toEqual(true);
    expect(new Report([1, 3, 6, 7, 9]).isSafeWithProblemDampener()).toEqual(true);
  });
});
