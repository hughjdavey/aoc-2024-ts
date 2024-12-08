import { Day } from '../day.ts';
import { Pair } from '../../shared/types.ts';
import { ensureDefined } from '../../shared/utils.ts';

type Command = Pair<number> | boolean;

export class Day3 extends Day {
  private commands = this.getCommands(this.inputString);

  partOne(): unknown {
    return this.commands
      .filter(command => typeof command !== 'boolean')
      .reduce((sum, pair) => sum + pair.a * pair.b, 0);
  }

  partTwo(): unknown {
    return this.commands.reduce(
      (state, command) => {
        if (typeof command === 'boolean') {
          return { enabled: command, sum: state.sum };
        } else {
          return { enabled: state.enabled, sum: state.enabled ? state.sum + command.a * command.b : state.sum };
        }
      },
      { enabled: true, sum: 0 },
    ).sum;
  }

  getCommands(input: string): Command[] {
    const rawCommands = [...input.matchAll(/mul\(\d+,\d+\)|do(n't)?\(\)/g)].map(match => match[0]);
    return rawCommands.map(command => {
      if (command === 'do()') {
        return true;
      } else if (command === "don't()") {
        return false;
      } else {
        const mulParams = ensureDefined(/mul\((\d+),(\d+)\)/.exec(command));
        return { a: Number.parseInt(mulParams[1]), b: Number.parseInt(mulParams[2]) };
      }
    });
  }
}
