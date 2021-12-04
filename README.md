# AoC TIMER

## What is it?

AoC timer measures your [Advent of Code](https://adventofcode.com/) solutions time in relative units,
so you can compare your code performance with others, independent of your machine specs.

The timer is not perfect in replicating the same results on different machines, but the results are precise enough to make it a fun tool.

It also provides a score and shows you the level of your optimizations, making performance tweaks more gratifying.

## Example output

```
    +--- AoC 2020 Day 18 - AOC TIMER --------------------+
    |                                                    |
    | Linux (x64) 8GB RAM                                |
    | Intel(R) Core(TM) i7-3630QM CPU @ 2.40GHz          |
    |                                                    |
    | Language: TypeScript                               |
    |                                                    |
    | Time: 14ms (next: -5ms)         Points: 256        |
    | Benchmark: 0.289%               Level: ★★★★★★★★☆☆  |
    |                                                    |
    +----------------------------------- git.io/JL9Qu ---+
```

## Installation

### Via NPM

It is the recommended way if you have Node.js and NPM already installed (or you are willing to do it).

Requires [Node 14LTS](https://nodejs.org/en/download/) or higher.

#### Global installation:

```
npm i aoctimer -g
```

#### Local installation (as a dev tool for your project):

```
npm i aoctimer -D
```

### Via binary package

If you prefer a single binary file (Node.js included), you can download it for the most popular platforms:

- [aoctimer-linux64-v3.0.3.zip](https://github.com/caderek/aoctimer/releases/download/v3.0.3/aoctimer-linux64-v3.0.3.zip)
- [aoctimer-macos-v3.0.3.zip](https://github.com/caderek/aoctimer/releases/download/v3.0.3/aoctimer-macos-v3.0.3.zip)
- [aoctimer-windows64-v3.0.3.zip](https://github.com/caderek/aoctimer/releases/download/v3.0.3/aoctimer-windows64-v3.0.3.zip)

## Preparing your code

AoC TIMER is language independent and relies on a simple protocol - in your code write to the stdout line that contains following info (in order):

- the word "total"
- the time as number
- the unit as one of (optional, `ms` as default):
  - `s` (seconds)
  - `ms` (milliseconds)
  - `us` (microseconds)
  - `ns` (nanoseconds)

Additional characters and spaces are allowed, the program is not case-sensitive.

Examples:

```
total 12.01ms

Total: 100 ns

TOTAL TIME - 5s

Total 12345

My solution has total time of 123.100 us.
```

Example (JS):

```typescript
import { read } from "../../utils/index"

const part1 = (input) => {
  // solution...
  return result
}

const part2 = (input) => {
  // solution...
  return result
}

const input = read()

const t0 = process.hrtime.bigint()
const result1 = part1(input)
const result2 = part2(input)
const t1 = process.hrtime.bigint()

const total = Number(t1 - t0) / 1e6

console.log("Solution to part 1:", result1)
console.log("Solution to part 2:", result2)

console.log(`Total time: ${total}ms`) // <- Line for AoC timer to parse
```

## Usage

In your project folder run:

```sh
aoctimer init
```

It will create the local config and execute the benchmark.

Execute your code (if you skip the day flag, it will try to autocomplete the day by scanning your command):

```sh
aoctimer --day <day_number> <your_command>

aoctimer -d <day_number> <your_command>

aoctimer <your_command>

# Examples:

  aoctimer node day01/index.js
  aoctimer python day5.py
  aoctimer day25.exe
  aoctimer go run aoc/day01/solution.go
  aoctimer -d 13 java my_solution
  aoctimer --day 15 lua solution.lua
```

Show the summary:

```sh
aoctimer summary
```

You can save the output of the commands to the file, using standard command-line piping:

```sh
# Save summary (Bash / zsh / fish):
aoctimer summary > MY_FILE.txt
```

## CLI

```
Commands:
  init [language] [year]        Calibrate and create local config
  summary                       Display the summary
  [-d, --day <day>] <command>   Run the timer for your command
  --help, -h                    Show help page
  --version, -v                 Show version
```

## Example summaries for two machines running the same code

```
+--- AoC 2020 - AOC TIMER ---------------------------+--- AoC 2020 - AOC TIMER ---------------------------+
|                                                    |                                                    |
| Linux (x64) 8GB RAM                                | Linux (x64) 1GB RAM                                |
| Intel(R) Core(TM) i7-3630QM CPU @ 2.40GHz          | Intel(R) Atom(TM) CPU N450   @ 1.66GHz             |
|                                                    |                                                    |
| Language: TypeScript                               | Language: TypeScript                               |
|                                                    |                                                    |
|--- DAYS -------------------------------------------|--- DAYS -------------------------------------------|
|                                                    |                                                    |
| Day 01                                             | Day 01                                             |
| ------                                             | ------                                             |
| Time: 379ms                     Points: 16         | Time: 3204ms                    Points: 16         |
| Benchmark: 7.812%               Level: ★★★★☆☆☆☆☆☆  | Benchmark: 9.238%               Level: ★★★★☆☆☆☆☆☆  |
|                                                    |                                                    |
| Day 02                                             | Day 02                                             |
| ------                                             | ------                                             |
| Time: 7ms                       Points: 512        | Time: 89ms                      Points: 256        |
| Benchmark: 0.145%               Level: ★★★★★★★★★☆  | Benchmark: 0.257%               Level: ★★★★★★★★☆☆  |
|                                                    |                                                    |
| Day 03                                             | Day 03                                             |
| ------                                             | ------                                             |
| Time: 2ms                       Points: 1024       | Time: 22ms                      Points: 1024       |
| Benchmark: 0.042%               Level: ★★★★★★★★★★  | Benchmark: 0.064%               Level: ★★★★★★★★★★  |
|                                                    |                                                    |
| Day 04                                             | Day 04                                             |
| ------                                             | ------                                             |
| Time: 15ms                      Points: 256        | Time: 113ms                     Points: 256        |
| Benchmark: 0.31%                Level: ★★★★★★★★☆☆  | Benchmark: 0.326%               Level: ★★★★★★★★☆☆  |
|                                                    |                                                    |
| Day 05                                             | Day 05                                             |
| ------                                             | ------                                             |
| Time: 3ms                       Points: 1024       | Time: 31ms                      Points: 1024       |
| Benchmark: 0.062%               Level: ★★★★★★★★★★  | Benchmark: 0.09%                Level: ★★★★★★★★★★  |
|                                                    |                                                    |
| Day 06                                             | Day 06                                             |
| ------                                             | ------                                             |
| Time: 6ms                       Points: 512        | Time: 75ms                      Points: 256        |
| Benchmark: 0.124%               Level: ★★★★★★★★★☆  | Benchmark: 0.217%               Level: ★★★★★★★★☆☆  |
|                                                    |                                                    |
| Day 07                                             | Day 07                                             |
| ------                                             | ------                                             |
| Time: 8ms                       Points: 512        | Time: 55ms                      Points: 512        |
| Benchmark: 0.165%               Level: ★★★★★★★★★☆  | Benchmark: 0.159%               Level: ★★★★★★★★★☆  |
|                                                    |                                                    |
| Day 08                                             | Day 08                                             |
| ------                                             | ------                                             |
| Time: 77ms                      Points: 64         | Time: 510ms                     Points: 64         |
| Benchmark: 1.587%               Level: ★★★★★★☆☆☆☆  | Benchmark: 1.471%               Level: ★★★★★★☆☆☆☆  |
|                                                    |                                                    |
| Day 09                                             | Day 09                                             |
| ------                                             | ------                                             |
| Time: 11ms                      Points: 256        | Time: 112ms                     Points: 256        |
| Benchmark: 0.227%               Level: ★★★★★★★★☆☆  | Benchmark: 0.323%               Level: ★★★★★★★★☆☆  |
|                                                    |                                                    |
| Day 10                                             | Day 10                                             |
| ------                                             | ------                                             |
| Time: 1ms                       Points: 1024       | Time: 6ms                       Points: 1024       |
| Benchmark: 0.021%               Level: ★★★★★★★★★★  | Benchmark: 0.018%               Level: ★★★★★★★★★★  |
|                                                    |                                                    |
| Day 11                                             | Day 11                                             |
| ------                                             | ------                                             |
| Time: 551ms                     Points: 8          | Time: 4292ms                    Points: 8          |
| Benchmark: 11.357%              Level: ★★★☆☆☆☆☆☆☆  | Benchmark: 12.375%              Level: ★★★☆☆☆☆☆☆☆  |
|                                                    |                                                    |
| Day 12                                             | Day 12                                             |
| ------                                             | ------                                             |
| Time: 4ms                       Points: 1024       | Time: 27ms                      Points: 1024       |
| Benchmark: 0.083%               Level: ★★★★★★★★★★  | Benchmark: 0.078%               Level: ★★★★★★★★★★  |
|                                                    |                                                    |
| Day 13                                             | Day 13                                             |
| ------                                             | ------                                             |
| Time: 1ms                       Points: 1024       | Time: 9ms                       Points: 1024       |
| Benchmark: 0.021%               Level: ★★★★★★★★★★  | Benchmark: 0.026%               Level: ★★★★★★★★★★  |
|                                                    |                                                    |
| Day 14                                             | Day 14                                             |
| ------                                             | ------                                             |
| Time: 199ms                     Points: 32         | Time: 1554ms                    Points: 32         |
| Benchmark: 4.102%               Level: ★★★★★☆☆☆☆☆  | Benchmark: 4.481%               Level: ★★★★★☆☆☆☆☆  |
|                                                    |                                                    |
| Day 15                                             | Day 15                                             |
| ------                                             | ------                                             |
| Time: 617ms                     Points: 8          | Time: 2593ms                    Points: 16         |
| Benchmark: 12.717%              Level: ★★★☆☆☆☆☆☆☆  | Benchmark: 7.476%               Level: ★★★★☆☆☆☆☆☆  |
|                                                    |                                                    |
| Day 16                                             | Day 16                                             |
| ------                                             | ------                                             |
| Time: 13ms                      Points: 256        | Time: 101ms                     Points: 256        |
| Benchmark: 0.268%               Level: ★★★★★★★★☆☆  | Benchmark: 0.292%               Level: ★★★★★★★★☆☆  |
|                                                    |                                                    |
| Day 17                                             | Day 17                                             |
| ------                                             | ------                                             |
| Time: 832ms                     Points: 8          | Time: 5662ms                    Points: 8          |
| Benchmark: 17.148%              Level: ★★★☆☆☆☆☆☆☆  | Benchmark: 16.325%              Level: ★★★☆☆☆☆☆☆☆  |
|                                                    |                                                    |
| Day 18                                             | Day 18                                             |
| ------                                             | ------                                             |
| Time: 15ms                      Points: 256        | Time: 144ms                     Points: 256        |
| Benchmark: 0.31%                Level: ★★★★★★★★☆☆  | Benchmark: 0.416%               Level: ★★★★★★★★☆☆  |
|                                                    |                                                    |
| Day 19                                             | Day 19                                             |
| ------                                             | ------                                             |
| Time: 133ms                     Points: 32         | Time: 1149ms                    Points: 32         |
| Benchmark: 2.742%               Level: ★★★★★☆☆☆☆☆  | Benchmark: 3.313%               Level: ★★★★★☆☆☆☆☆  |
|                                                    |                                                    |
| Day 20                                             | Day 20                                             |
| ------                                             | ------                                             |
| Time: 138ms                     Points: 32         | Time: 1045ms                    Points: 32         |
| Benchmark: 2.845%               Level: ★★★★★☆☆☆☆☆  | Benchmark: 3.013%               Level: ★★★★★☆☆☆☆☆  |
|                                                    |                                                    |
| Day 21                                             | Day 21                                             |
| ------                                             | ------                                             |
| Time: 3ms                       Points: 1024       | Time: 34ms                      Points: 1024       |
| Benchmark: 0.062%               Level: ★★★★★★★★★★  | Benchmark: 0.099%               Level: ★★★★★★★★★★  |
|                                                    |                                                    |
| Day 22                                             | Day 22                                             |
| ------                                             | ------                                             |
| Time: 784ms                     Points: 8          | Time: 5548ms                    Points: 8          |
| Benchmark: 16.159%              Level: ★★★☆☆☆☆☆☆☆  | Benchmark: 15.996%              Level: ★★★☆☆☆☆☆☆☆  |
|                                                    |                                                    |
| Day 23                                             | Day 23                                             |
| ------                                             | ------                                             |
| Time: 349ms                     Points: 16         | Time: 2811ms                    Points: 16         |
| Benchmark: 7.193%               Level: ★★★★☆☆☆☆☆☆  | Benchmark: 8.105%               Level: ★★★★☆☆☆☆☆☆  |
|                                                    |                                                    |
| Day 24                                             | Day 24                                             |
| ------                                             | ------                                             |
| Time: 753ms                     Points: 8          | Time: 5708ms                    Points: 8          |
| Benchmark: 15.52%               Level: ★★★☆☆☆☆☆☆☆  | Benchmark: 16.457%              Level: ★★★☆☆☆☆☆☆☆  |
|                                                    |                                                    |
| Day 25                                             | Day 25                                             |
| ------                                             | ------                                             |
| Time: 106ms                     Points: 32         | Time: 651ms                     Points: 64         |
| Benchmark: 2.185%               Level: ★★★★★☆☆☆☆☆  | Benchmark: 1.877%               Level: ★★★★★★☆☆☆☆  |
|                                                    |                                                    |
|--- SUMMARY ----------------------------------------|--- SUMMARY ----------------------------------------|
|                                                    |                                                    |
| Completed: 25 / 25                                 | Completed: 25 / 25                                 |
|                                                    |                                                    |
| Total time: 5007ms                                 | Total time: 35545ms                                |
| Benchmark (average): 4.128%                        | Benchmark (average): 4.100%                        |
|                                                    |                                                    |
| Total score: 8968                                  | Total score: 8496                                  |
| Level (average): ★★★★★★★☆☆☆                        | Level (average): ★★★★★★★☆☆☆                        |
|                                                    |                                                    |
+----------------------------------- git.io/JL9Qu ---+----------------------------------- git.io/JL9Qu ---+
```

## License

Project is under open, non-restrictive [ISC license](LICENSE).
