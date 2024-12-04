import { Day } from './day.ts';
import { count } from '../shared/utils.ts';

export class Day2 extends Day {
  partOne(): unknown {
    const reports = this.inputList
      .map(line => line.split(/\s+/).map(i => Number.parseInt(i, 10)))
      .map(levels => new Report(levels));
    return count(reports, report => report.isSafe());
  }

  partTwo(): unknown {
    const reports = this.inputList
      .map(line => line.split(/\s+/).map(i => Number.parseInt(i, 10)))
      .map(levels => new Report(levels));
    return count(reports, report => report.isSafeWithProblemDampener());
  }
}

export class Report {
  levels: number[];
  differences: number[];

  constructor(levels: number[] = []) {
    this.levels = levels;
    this.differences = this.levels.slice(1).map((level, index) => Math.abs(level - this.levels[index]));
  }

  isSafe(): boolean {
    return (
      (this.levels.toString() === this.levels.toSorted((a, b) => a - b).toString() ||
        this.levels.toString() === this.levels.toSorted((a, b) => b - a).toString()) &&
      this.differences.every(difference => difference >= 1 && difference <= 3)
    );
  }

  isSafeWithProblemDampener(): boolean {
    if (this.isSafe()) {
      return true;
    }
    const reports = this.levels
      .map((_, index) => this.levels.with(index, NaN).filter(n => !isNaN(n)))
      .map(levels => new Report(levels));
    return reports.find(report => report.isSafe()) !== undefined;
  }
}
