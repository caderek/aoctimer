import { spawn } from "child_process"
import { DH_NOT_SUITABLE_GENERATOR } from "constants"
import * as os from "os"
import calibrate from "./calibrate"
import { check, save, load } from "./unit"

let config = load()

const [first, ...rest] = process.argv.slice(2)

const OS = {
  aix: "AIX",
  darwin: "MacOS",
  freebsd: "FreeBSD",
  linux: "Linux",
  openbsd: "OpenBSD",
  sunos: "SunOS",
  win32: "Windows",
}

const getStats = (rawTime: bigint) => {
  const bench = Math.ceil(config.benchmark / 1000000)
  const time = Math.ceil(Number(rawTime) / 1000000)

  const thresholds = [
    [1, bench],
    [2, bench * 0.5],
    [3, bench * 0.2],
    [4, bench * 0.1],
    [5, bench * 0.05],
    [6, bench * 0.02],
    [7, bench * 0.01],
    [8, bench * 0.005],
    [9, bench * 0.002],
    [10, bench * 0.001],
  ]

  const next = thresholds.find(([_, v]) => v < time)
  const delta = next ? Math.ceil(time - next[1]) : null
  const prev = thresholds.reverse().find(([_, v]) => time < v)
  const exponent = prev ? prev[0] : 0
  const rel = Math.ceil((time / bench) * 100000) / 1000

  return { time, exponent, delta, rel }
}

const format = (rawTime: bigint) => {
  const { time, exponent, delta, rel } = getStats(rawTime)
  const points = 2 ** exponent
  const cpu = os.cpus()[0].model
  const mem = Math.round(os.totalmem() / 10 ** 9)
  const relative = `${rel}%`

  const osView = `${OS[os.platform()]} (${os.arch()}) ${mem}GB RAM`.padEnd(
    50,
    " ",
  )

  const cpuView = `${cpu}`.padEnd(50, " ")

  const timeView = `${time}ms${delta !== null ? ` (next: -${delta}ms)` : ""}`

  const statsView1 = `${timeView.padEnd(25, " ")} Points: ${String(
    points,
  )}`.padEnd(44, " ")

  const statsView2 = `${relative.padEnd(21, " ")} Level: ${"★"
    .repeat(exponent)
    .padEnd(10, "☆")}`.padEnd(40, " ")

  const summary = `
    +--- AoC 2020 Day 15 - EVE TIMER --------------------+
    |                                                    |
    | ${osView} |
    | ${cpuView} |
    |                                                    |
    | Lang: TypeScript (Node)                            |
    |                                                    |
    | Time: ${statsView1} |
    | Relative: ${statsView2} |
    |                                                    |
    +---------------------------------- eve.github.io ---+
`

  return summary
}

switch (String(first || "").toLowerCase()) {
  case "": {
    console.log("Info")
    break
  }
  case "-h":
  case "--help": {
    console.log("Help")
    break
  }
  case "calibrate": {
    console.log("Calibrating...")
    const benchmark = calibrate()
    save({ benchmark })
    console.log("Calibrated!")
    break
  }
  default: {
    if (!check() || !config.benchmark) {
      console.log("Calibrating...")
      const benchmark = calibrate()
      save({ benchmark })
      config = load()
      console.log("Calibrated!")
    }

    let codeStart: bigint = 0n
    let codeEnd: bigint = 0n

    const ps = spawn(first, rest, {
      stdio: ["pipe", "pipe", process.stderr],
    }).once("close", () => {
      if (codeStart !== 0n && codeEnd !== 0n) {
        console.log(format(codeEnd - codeStart))
      } else {
        console.log("No code marked for measuring.")
      }
    })

    ps.stdout.on("data", (data) => {
      if (data.includes("^")) {
        codeStart = process.hrtime.bigint()
      }

      if (data.includes("$")) {
        codeEnd = process.hrtime.bigint()
      }
    })
  }
}
