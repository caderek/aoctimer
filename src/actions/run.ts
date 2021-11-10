import { spawn } from "child_process"
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

const run = (command: string, args: string[], day: string | null) => {
  if (!check() || !config.benchmark) {
    console.log("Please run 'aoctimer init' first.")
    return
  }

  day = day ?? getDay()

  let output = ""

  const ps = spawn(command, args, {
    stdio: ["pipe", "pipe", process.stderr],
  })

  ps.stdout.on("data", (data) => {
    output += data.toString()
  })

  ps.once("close", () => {
    const time = extractTime(output)

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

      console.log(views.day(day, data))
    } else {
      console.log(NO_TIME_MESSAGE)
    }
  })
}

export default run
