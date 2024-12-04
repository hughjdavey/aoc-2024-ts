import fs from 'fs';
import path from 'path';

const getDayNumber = (): string => {
  const dayNumber = process.argv[2];
  if (dayNumber === undefined || isNaN(parseInt(dayNumber))) {
    throw new Error('Day number argument is required and must be an integer');
  }
  return dayNumber;
};

const getPath = (dayNumber: string, type: 'day' | 'input', test: boolean): string => {
  const filePath =
    type === 'day' && !test
      ? path.resolve(__dirname, '..', 'src', 'days', `day${dayNumber}.ts`)
      : type === 'day' && test
        ? path.resolve(__dirname, '..', 'test', `day${dayNumber}.spec.ts`)
        : type === 'input' && !test
          ? path.resolve(__dirname, '..', 'inputs', `day${dayNumber}.txt`)
          : path.resolve(__dirname, '..', 'test-inputs', `day${dayNumber}.txt`);
  if (fs.existsSync(filePath)) {
    throw new Error(`File already exists at ${filePath}`);
  }
  return filePath;
};

const getDayTemplate = (dayNumber: string): string =>
  `import { Day } from './day';

export class Day${dayNumber} extends Day {
  partOne(): unknown {
    return 'part one';
  }

  partTwo(): unknown {
    return 'part two';
  }
}
`;

const getDayTestTemplate = (dayNumber: string): string =>
  `import { Day${dayNumber} } from '../src/days/day${dayNumber}.ts';

const day${dayNumber} = new Day${dayNumber}(${dayNumber});

test('part one', () => {
  expect(day${dayNumber}.partOne()).toEqual('part one');
});

test('part two', () => {
  expect(day${dayNumber}.partTwo()).toEqual('part two');
});
`;

try {
  const dayNumber = getDayNumber();
  fs.writeFileSync(getPath(dayNumber, 'day', false), getDayTemplate(dayNumber));
  fs.writeFileSync(getPath(dayNumber, 'day', true), getDayTestTemplate(dayNumber));
  fs.writeFileSync(getPath(dayNumber, 'input', false), '\n');
  fs.writeFileSync(getPath(dayNumber, 'input', true), '\n');
} catch (error) {
  const message = error instanceof Error ? error.message : JSON.stringify(error);
  console.error('Error adding new day -', message);
}
