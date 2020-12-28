import help from "./actions/help"
import init from "./actions/init"
import calibrate from "./actions/calibrate"
import info from "./actions/info"
import run from "./actions/run"

const [first, ...rest] = process.argv.slice(2).map((v) => v.trim())

switch (String(first || "").toLowerCase()) {
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
  default: {
    run(first, rest)
  }
}
