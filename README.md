# aoc-typescript-starter

Starter template for solving [Advent of Code](https://adventofcode.com) in [TypeScript](https://www.typescriptlang.org).

## Features

* NPM setup so you can run a specific day or all days on the command line
* NPM setup so you can add a new day on the command line
* Timings for each part of each day
* Input for each day automatically exposed in `string` and `string[]` form
* Testing setup with Jest included

## How it works

* Solutions live in the [src/days/](src/days) directory and extend the abstract class `Day`
  * These follow the naming convention `dayX.ts` (and the classes in code `DayX`)
* Inputs live in the [inputs/](inputs) directory
  * These follow the naming convention `dayX.txt`
* Tests live in the [test/](test) directory
* Test inputs live in the [test-inputs/](test-inputs) directory and **by default tests use these and not the real inputs**
  * This is so you can easily run tests against the smaller examples that are given for the AOC day
  * If you want to run against the real input files, set the `USE_REAL_INPUTS` environment variable to `true` (example below)

## How to use

### Run solutions

* Run all days `npm start`
* Run a single day `npm start -- 2`&ast;

### Create solutions

* Create a new day file `dayX.ts` in the [src/days/](src/days) directory, exporting a class `DayX` which extends the abstract class `Day`
* Create a new input file `dayX.txt` in the [inputs/](inputs) directory
* The easiest way to do this is to use the provided `add-day` script
  * e.g. Add files for Day 2 `npm run add-day -- 2`&ast;

### Write solutions

* It is assumed all solutions will have two parts but share the same input
* Override the `partOne` and `partTwo` methods from the `Day` abstract class and put your solutions there
  * You must return a value from these methods (typed as `unknown` so it can be anything)
* Access input by using the `inputList` and `inputString` variables that will be available in any subclass of `Day`

### Run tests

* Run all tests `npm run test`
* Run a single test `npm run test day1`
* Run all tests on real input files `USE_REAL_INPUTS=true npm run test`

### Create tests

* Create a new day test `dayX.spec.ts` file in the [test/](test) directory (names don't actually matter like they do for solutions)
* Create a new input file `dayX.txt` in the [test-inputs/](test-inputs) directory as **by default tests use these and not the real inputs**
  * This is so you can easily run tests against the smaller examples that are given for the AOC day
  * If you want to run against the real input files, set the `USE_REAL_INPUTS` environment variable to `true`

&ast; The `--` is how to pass arguments to npm scripts - the commands above are passing the argument `2`.

## Getting started

* Day 1 solution class and input file are stubbed as a guide on how to extend the project, and how you can use the `inputList` and `inputString` mentioned above
* To get started simply replace `inputs/day1.txt` with the real input and the solutions in `src/day1.ts` with your own
* A Day 1 test also exists at `test/day1.spec.ts`, mostly to show a few jest methods and how test input files can differ from actual ones. To get started with testing you can edit this class, and the input file at `test-inputs/day1.txt`
