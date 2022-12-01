import { spawnSync, execSync } from "child_process"
import config, { check, save } from "../config"
import views from "../views"
import stats from "../stats"
import getDay from "../helpers/get-day"
import extractTime from "../helpers/extract-time"

const NO_TIME_MESSAGE = `
No time output.

Write to the stdout line that contains following info (in order):
  - word "total"
  - time as number
  - unit as one of: s, ms, us, ns (optional, ms as default)

Additional characters and spaces are allowed, script is not case-sensitive.

Examples:

total 12.01ms
Total: 100 ns
TOTAL TIME - 5s
Total 12345
My solution has total time of 123.100 us.
`

const runStats = (time: bigint, day: string) => {
  if (time !== null) {
    const data = stats.day(time)

    if (day !== "??") {
      save({
        days: [
          ...config.days.filter((v) => v.day !== day),
          {
            day,
            level: data.exponent,
            score: 2 ** data.exponent,
            time: data.time,
            rel: data.rel,
          },
        ],
      })
    }

    return data
  } else {
    console.log(NO_TIME_MESSAGE)
  }
}

const run = ({ day, command, time }) => {
  if (!check() || !config.benchmark) {
    console.log("Please run 'aoctimer init' first.")
    return
  }

  day = day ?? getDay(command)

  if (time !== null) {
    const data = runStats(time, day)
    console.log(views.day(day, data))
    process.exit()
  }

  try {
    const output = execSync(command).toString()
    const time = extractTime(output)
    const data = runStats(time, day)
    console.log(views.day(day, data))
  } catch (e) {
    console.log(`Failed to execute the command: ${command}`)
  }
}

export default run
