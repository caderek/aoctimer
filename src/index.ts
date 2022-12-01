#!/usr/bin/env node
import help from "./actions/help"
import init from "./actions/init"
import info from "./actions/info"
import summary from "./actions/summary"
import run from "./actions/run"
import parseArgs from "./helpers/parse-args"

const { command, args } = parseArgs(process.argv)

switch (command) {
  case "info": {
    info()
    break
  }
  case "help": {
    help()
    break
  }
  case "version": {
    console.log("v3.1.2")
    break
  }
  case "init": {
    init(args as { language: string; year: string })
    break
  }
  case "summary": {
    summary()
    break
  }
  case "run": {
    run(args as { day: string | null; command: string; time: string | null })
    break
  }
  default: {
    console.log(`Unknown command: ${command}`)
    process.exit(1)
  }
}
