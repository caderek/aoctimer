import extractTime, { isTime } from "./extract-time"

const parseArgs = (argv: string[]) => {
  const rawArgs = argv.slice(2).map((arg) => arg.trim())

  if (rawArgs.length === 0) {
    return { command: "info", args: null }
  }

  if (rawArgs.includes("-h") || rawArgs.includes("--help")) {
    return { command: "help", args: null }
  }

  if (rawArgs.includes("-v") || rawArgs.includes("--version")) {
    return { command: "version", args: null }
  }

  if (rawArgs[0] === "init") {
    return { command: "init", args: { language: rawArgs[1], year: rawArgs[2] } }
  }

  if (rawArgs[0] === "summary") {
    return { command: "summary", args: null }
  }

  if (["-d", "--day"].includes(rawArgs[0])) {
    const day = Number(rawArgs[1])

    if (day < 1 || day > 25) {
      console.log("Wrong day number, choose the day between 1 and 25.")
      process.exit(1)
    }

    const time = isTime(rawArgs[2]) ? extractTime(rawArgs[2], "total") : null
    return {
      command: "run",
      args: {
        day: String(day).padStart(2, "0"),
        command: time === null ? rawArgs.slice(2).join(" ") : null,
        time,
      },
    }
  }

  const time = isTime(rawArgs[0]) ? extractTime(rawArgs[2], "total") : null
  return {
    command: "run",
    args: {
      day: null,
      command: time === null ? rawArgs.join(" ") : null,
      time,
    },
  }
}

export default parseArgs
