import { spawn } from "child_process"
import config, { check } from "../config"
import views from "../views"

const NO_INDICATORS_MESSAGE = `
No code marked for measuring.

Write to the stdout:
^ - at the beginning of your code
$ - at he end of your code
`

const run = (command, args) => {
  if (!check() || !config.benchmark) {
    console.log("Please run 'aoctimer init' first.")
    return
  }

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
      console.log(views.day(codeEnd - codeStart))
    } else {
      console.log(NO_INDICATORS_MESSAGE)
    }
  })
}

export default run
