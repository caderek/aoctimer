import aoc202002 from "./cases/aoc-2020-02"

const run = () => {
  aoc202002()
}

const calibrate = () => {
  const start = process.hrtime.bigint()
  for (let i = 0; i < 1000; i++) {
    run()
  }
  return Number(process.hrtime.bigint() - start)
}

export default calibrate
