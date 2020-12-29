#!/usr/bin/env node
import help from "./actions/help"
import init from "./actions/init"
import calibrate from "./actions/calibrate"
import info from "./actions/info"
import summary from "./actions/summary"
import run from "./actions/run"

let all = process.argv.slice(2).map((v) => v.trim())
let day: string | null = null

if (all[0] === "-d" || all[0] === "--day") {
  day = all[1].padStart(2, "0")
  all = all.slice(2)
}

const [command, ...args] = all

switch (String(command || "").toLowerCase()) {
  case "": {
    info()
    break
  }
  case "-h":
  case "--help": {
    help()
    break
  }
  case "init": {
    init()
    break
  }
  case "calibrate": {
    calibrate()
    break
  }
  case "summary": {
    summary()
    break
  }
  default: {
    run(command, args, day)
  }
}
