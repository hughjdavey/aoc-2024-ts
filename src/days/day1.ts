import { Day } from './day';

export class Day1 extends Day {
  partOne(): unknown {
    return this.inputList
      .slice(0, 2)
      .map(word => word.toUpperCase())
      .join(' ');
  }

  partTwo(): unknown {
    return this.inputString
      .split('\n')
      .filter(word => word.length > 0)
      .map(word => word.toUpperCase())
      .slice(-1)[0];
  }
}
