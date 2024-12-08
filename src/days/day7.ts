import { Day } from './day';

type CalibrationLine = { result: number; operands: number[] };

type Operator = '+' | '*' | '||';

type Equation = (number | Operator)[];

export class Day7 extends Day {
  lines: CalibrationLine[] = this.inputList.map(line => {
    const [result, rest] = line.split(': ');
    const operands = rest.split(' ');
    return { result: Number.parseInt(result), operands: operands.map(o => Number.parseInt(o)) };
  });

  partOne(): unknown {
    return this.sumOfTrueLines(['+', '*']);
  }

  // this works but needs extra memory (run with node --max-old-space-size=8192) and takes around a minute on my machine
  partTwo(): unknown {
    return this.sumOfTrueLines(['+', '*', '||']);
  }

  sumOfTrueLines(operators: Operator[]): number {
    return this.lines
      .map(line => ({ result: line.result, equations: this.getPossibleEquations(line.operands, operators) }))
      .filter(e => e.equations.some(seq => this.evaluate(seq) === e.result))
      .map(e => e.result)
      .reduce((a, b) => a + b, 0);
  }

  evaluate(equation: Equation): number {
    return equation.slice(2).reduce(
      (acc, elem) => {
        if (typeof elem === 'number') {
          return {
            res: acc.op === '+' ? acc.res + elem : acc.op === '*' ? acc.res * elem : this.concat(acc.res, elem),
            op: acc.op,
          };
        } else {
          return { res: acc.res, op: elem };
        }
      },
      { res: equation[0] as number, op: equation[1] as Operator },
    ).res;
  }

  concat(a: number, b: number): number {
    return Number.parseInt(a.toString() + b.toString());
  }

  getPossibleEquations(
    operands: number[],
    operators: Operator[],
    eq: Equation = [],
    eqs: Equation[] = [],
  ): (number | Operator)[][] {
    if (operands.length === 0) {
      return [...eqs, eq];
    } else if (operands.length === 1) {
      return [...eqs, [...eq, operands[0]]];
    }

    const next = operands[0];
    return operators.flatMap(operator =>
      this.getPossibleEquations(operands.slice(1), operators, [...eq, next, operator], eqs),
    );
  }
}
