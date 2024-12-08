import { Day } from '../day.ts';

export class Day5 extends Day {
  rules = this.inputList.slice(0, this.inputList.indexOf('')).map(l => l.split('|').map(n => Number.parseInt(n)));

  updates = this.inputList.slice(this.inputList.indexOf('') + 1).map(l => l.split(',').map(n => Number.parseInt(n)));

  partOne(): unknown {
    return this.updates
      .filter(update => this.isInRightOrder(update))
      .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);
  }

  partTwo(): unknown {
    return this.updates
      .filter(update => !this.isInRightOrder(update))
      .map(update => this.putInRightOrder(update))
      .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);
  }

  isInRightOrder(update: number[]): boolean {
    for (const pageNumber of update) {
      const i = update.indexOf(pageNumber);
      const mustBeBefore = this.rules.filter(r => r[1] === pageNumber).map(r => r[0]);
      const after = update.slice(i + 1);
      if (mustBeBefore.some(n => after.includes(n))) {
        return false;
      }
    }
    return true;
  }

  putInRightOrder(update: number[]): number[] {
    return update.toSorted((a, b) => {
      const mustBeBeforeB = this.rules.filter(r => r[1] === b).map(r => r[0]);
      if (mustBeBeforeB.includes(a)) {
        return -1;
      }
      const mustBeBeforeA = this.rules.filter(r => r[1] === a).map(r => r[0]);
      if (mustBeBeforeA.includes(b)) {
        return 1;
      }
      return 0;
    });
  }
}
