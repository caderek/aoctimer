import extractTime from "./extract-time"

const parseArgs = (argv: string[]) => {
  const rawArgs = argv.slice(2).map((arg) => arg.trim())

  if (rawArgs.length === 0) {
    return { command: "info", args: null }
  }

  if (rawArgs.includes("-h") || rawArgs.includes("--help")) {
    return { command: "help", args: null }
  }

  if (rawArgs[0] === "init") {
    return { command: "init", args: { language: rawArgs[1], year: rawArgs[2] } }
  }

  if (rawArgs[0] === "calibrate") {
    return { command: "calibrate", args: null }
  }

  if (rawArgs[0] === "summary") {
    return { command: "summary", args: null }
  }

  if (["-d", "--day"].includes(rawArgs[0])) {
    const time = extractTime(rawArgs[2], "total")
    return {
      command: "run",
      args: {
        day: rawArgs[1].padStart(2, "0"),
        exec: time === null ? rawArgs.slice(2) : null,
        time,
      },
    }
  }

  const time = extractTime(rawArgs[0], "total")
  return {
    command: "run",
    args: { day: null, exec: time === null ? rawArgs : null, time },
  }
}

export default parseArgs
