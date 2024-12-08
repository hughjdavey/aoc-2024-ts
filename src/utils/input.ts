import fs from 'fs';
import path from 'path';

export const getInputAsString = (day: number): string => {
  const useTestInput = process.env.NODE_ENV === 'test' && process.env.USE_REAL_INPUTS !== 'true';
  return fs
    .readFileSync(path.resolve(`${process.cwd()}/${useTestInput ? 'test-' : ''}inputs`, `day${day}.txt`))
    .toString('utf-8');
};

export const getInputAsList = (day: number): string[] => {
  return getInputAsString(day).trimEnd().split(`\n`);
};
