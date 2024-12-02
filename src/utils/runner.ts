import { Day } from '../days/day.ts';

/**
 * Since TypeScript doesn't seem to have the reflection capabilities of e.g. Java, this is the best way I have found
 * to return an object containing instantiated Days
 *
 * Each key is actually an async function so we don't preload unneeded days (if the user runs a single day for instance)
 *
 * We have to hardcode all these paths because esbuild does not support using a template string like await import(`./days/day${n}.js`)
 *
 * We include all days in the object even nonexistent ones. These are handled by catching and doing nothing with the error.
 * In the returned object they will be undefined so it is easy to check if the day we need is undefined and if so we know it does not exist
 */
export const getDays = async (): Promise<Record<string, () => Promise<void | Day>>> => {
  return {
    day1: async () => await import('../days/day1.ts').then(d => new d['Day1'](1)).catch(),
    day2: async () => await import('../days/day2.ts').then(d => new d['Day2'](2)).catch(noop),
    day3: async () => await import('../days/day3.ts').then(d => new d['Day3'](3)).catch(noop),
    day4: async () => await import('../days/day4.ts').then(d => new d['Day4'](4)).catch(noop),
    day5: async () => await import('../days/day5.ts').then(d => new d['Day5'](5)).catch(noop),
    day6: async () => await import('../days/day6.ts').then(d => new d['Day6'](6)).catch(noop),
    day7: async () => await import('../days/day7.ts').then(d => new d['Day7'](7)).catch(noop),
    day8: async () => await import('../days/day8.ts').then(d => new d['Day8'](8)).catch(noop),
    day9: async () => await import('../days/day9.ts').then(d => new d['Day9'](9)).catch(noop),
    day10: async () => await import('../days/day10.ts').then(d => new d['Day10'](10)).catch(noop),
    day11: async () => await import('../days/day11.ts').then(d => new d['Day11'](11)).catch(noop),
    day12: async () => await import('../days/day12.ts').then(d => new d['Day12'](12)).catch(noop),
    day13: async () => await import('../days/day13.ts').then(d => new d['Day13'](13)).catch(noop),
    day14: async () => await import('../days/day14.ts').then(d => new d['Day14'](14)).catch(noop),
    day15: async () => await import('../days/day15.ts').then(d => new d['Day15'](15)).catch(noop),
    day16: async () => await import('../days/day16.ts').then(d => new d['Day16'](16)).catch(noop),
    day17: async () => await import('../days/day17.ts').then(d => new d['Day17'](17)).catch(noop),
    day18: async () => await import('../days/day18.ts').then(d => new d['Day18'](18)).catch(noop),
    day19: async () => await import('../days/day19.ts').then(d => new d['Day19'](19)).catch(noop),
    day20: async () => await import('../days/day20.ts').then(d => new d['Day20'](20)).catch(noop),
    day21: async () => await import('../days/day21.ts').then(d => new d['Day21'](21)).catch(noop),
    day22: async () => await import('../days/day22.ts').then(d => new d['Day22'](22)).catch(noop),
    day23: async () => await import('../days/day23.ts').then(d => new d['Day23'](23)).catch(noop),
    day24: async () => await import('../days/day24.ts').then(d => new d['Day24'](24)).catch(noop),
    day25: async () => await import('../days/day25.ts').then(d => new d['Day25'](25)).catch(noop),
  };
};

const noop: () => void = () => {};

const runner = async (): Promise<void> => {
  const allDays = await getDays();
  const dayNumber = process.argv[2];
  if (dayNumber !== undefined) {
    const day = await allDays[`day${dayNumber}`]();
    if (day === undefined) {
      throw new Error(`Could not find Day ${dayNumber} - ensure that a class exists at src/days/day${dayNumber}.ts`);
    }
    runDay(day);
  } else {
    for (const key of Object.keys(allDays)) {
      const day = await allDays[key]();
      if (day === undefined) {
        break;
      }
      runDay(day);
    }
  }
};

const runDay = (day: Day): void => {
  const { result: partOneResult, time: partOneTime } = runPart(day, 1);
  const { result: partTwoResult, time: partTwoTime } = runPart(day, 2);
  const padding = Math.max(partOneResult.length, partTwoResult.length) + 14; // 14 is 8 (length of 'Part 1: ') + 6 more
  console.log(`=== DAY ${day.dayNumber} ===`);
  console.log(`Part 1: ${partOneResult.padEnd(padding)} (${partOneTime})`);
  console.log(`Part 2: ${partTwoResult.padEnd(padding)} (${partTwoTime})`);
  console.log();
};

const runPart = (day: Day, partNumber: 1 | 2): { result: string; time: string } => {
  const partFunction = partNumber === 1 ? () => day.partOne() : () => day.partTwo();
  try {
    const startTime = process.hrtime();
    const result = partFunction();
    const timeInNs = process.hrtime(startTime)[1];
    return {
      result: typeof result === 'string' ? result : JSON.stringify(result),
      time: getReadableTime(timeInNs),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    throw new Error(`Error running day ${day.dayNumber} part ${partNumber} - ${message}`);
  }
};

const getReadableTime = (timeInNs: number): string => {
  if (timeInNs > 1_000_000_000) {
    return `${(timeInNs / 1_000_000_000).toFixed(3)}s`
  } else if (timeInNs > 1_000_000) {
    return `${(timeInNs / 1_000_000).toFixed(3)}ms`
  } else if (timeInNs > 1_000) {
    return `${(timeInNs / 1_000).toFixed(3)}µs`
  } else {
    return `${timeInNs}ns`
  }
};

runner().catch(error => console.error(error));
