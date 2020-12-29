import { spawn } from "child_process"
import config, { check, save } from "../config"
import views from "../views"
import stats from "../stats"
import getDay from "../helpers/get-day"

const NO_INDICATORS_MESSAGE = `
No code marked for measuring.

Write to the stdout:
^ - at the beginning of your code
$ - at he end of your code
`

const run = (command: string, args: string[], day: string | null) => {
  if (!check() || !config.benchmark) {
    console.log("Please run 'aoctimer init' first.")
    return
  }

  day = day ?? getDay()
  let codeStart: bigint = 0n
  let codeEnd: bigint = 0n

  const ps = spawn(command, args, {
    stdio: ["pipe", "pipe", process.stderr],
  })

  ps.stdout.on("data", (data) => {
    if (data.includes("^")) {
      codeStart = process.hrtime.bigint()
    }

    if (data.includes("$")) {
      codeEnd = process.hrtime.bigint()
    }
  })

  ps.once("close", () => {
    if (codeStart !== 0n && codeEnd !== 0n) {
      const data = stats.day(codeEnd - codeStart)

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
      console.log(NO_INDICATORS_MESSAGE)
    }
  })
}

export default run
