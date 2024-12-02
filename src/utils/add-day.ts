import fs from 'fs';
import path from 'path';

const getDayNumber = (): string => {
  const dayNumber = process.argv[2];
  if (dayNumber === undefined || isNaN(parseInt(dayNumber))) {
    throw new Error('Day number argument is required and must be an integer');
  }
  return dayNumber;
};

const getPath = (dayNumber: string, type: 'day' | 'input'): string => {
  const filePath =
    type === 'day'
      ? path.resolve(__dirname, '..', 'src', 'days', `day${dayNumber}.ts`)
      : path.resolve(__dirname, '..', 'inputs', `day${dayNumber}.txt`);
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

try {
  const dayNumber = getDayNumber();
  const dayPath = getPath(dayNumber, 'day');
  const inputPath = getPath(dayNumber, 'input');
  fs.writeFileSync(dayPath, getDayTemplate(dayNumber));
  fs.writeFileSync(inputPath, '\n');
} catch (error) {
  const message = error instanceof Error ? error.message : JSON.stringify(error);
  console.error('Error adding new day -', message);
}
