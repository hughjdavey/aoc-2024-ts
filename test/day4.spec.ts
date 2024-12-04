import { Day4 } from '../src/days/day4.ts';
import { Coord } from '../src/shared/coords.ts';

const day4 = new Day4(4);

describe('day 4', () => {
  test('part one', () => {
    expect(day4.partOne()).toEqual(18);
  });

  test('part two', () => {
    expect(day4.partTwo()).toEqual(9);
  });

  test('get possible xmases', () => {
    expect(day4.getPossibleXmases(new Coord(0, 0))).toEqual(0);
    expect(day4.getPossibleXmases(new Coord(4, 0))).toEqual(1);
    expect(day4.getPossibleXmases(new Coord(5, 0))).toEqual(1);
    expect(day4.getPossibleXmases(new Coord(6, 4))).toEqual(2);
    expect(day4.getPossibleXmases(new Coord(3, 9))).toEqual(2);
    expect(day4.getPossibleXmases(new Coord(5, 9))).toEqual(3);
  });

  test('get grid snapshots', () => {
    const snapshots = day4.getGridSnapshots();
    expect(snapshots).toHaveLength(64); // 8 x 8
    expect(snapshots[0]).toEqual('MMMMSAAMX');
    expect(snapshots[7]).toEqual('ASMMSAAMM');
    expect(snapshots[56]).toEqual('SAXMAMMXM');
    expect(snapshots[63]).toEqual('AAAMMMASX');
  });
});
