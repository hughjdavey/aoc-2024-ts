import { Day } from './day';
import { Pair } from '../shared/types.ts';
import { count } from '../shared/utils.ts';

export class Day1 extends Day {
  private lists = this.extractLists();

  partOne(): unknown {
    return this.pairBySize(this.lists).reduce((sum, pair) => sum + Math.abs(pair.a - pair.b), 0);
  }

  partTwo(): unknown {
    return this.lists.a.reduce((sum, a) => sum + a * count(this.lists.b, b => b === a), 0);
  }

  extractLists(): Pair<number[]> {
    return this.inputList.reduce<Pair<number[]>>(
      (acc, elem) => {
        const [a, b] = elem.split(/\s+/).map(n => Number.parseInt(n, 10));
        acc.a.push(a);
        acc.b.push(b);
        return acc;
      },
      { a: [], b: [] },
    );
  }

  pairBySize(lists: Pair<number[]>): Pair<number>[] {
    const as = lists.a.toSorted();
    const bs = lists.b.toSorted();
    return as.map((a, index) => ({ a, b: bs[index] }));
  }
}
