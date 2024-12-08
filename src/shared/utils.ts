export const count = <T>(ts: T[], predicate: (t: T) => boolean): number => {
  return ts.filter(t => predicate(t)).length;
};

export const range = (start: number, end: number) => {
  return Array(end + 1 - start)
    .fill(start)
    .map((i, index) => i + index);
};

export const ensureDefined = <T>(t: T | null | undefined): T => {
  if (t === null || t === undefined) {
    throw new Error('null or undefined');
  }
  return t;
};

export const allPairs = <T>(ts: T[]): T[][] => {
  return range(0, ts.length - 1)
    .flatMap(i1 => range(0, ts.length - 1).map(i2 => [ts[i1], ts[i2]]))
    .filter(([a, b]) => a !== b);
};
