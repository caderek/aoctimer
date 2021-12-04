import config from "../config"
import toFixed from "../helpers/to-fixed"
import renderSystem from "./render-system"

const renderDay = (day: string | null, data: any) => {
  const { time, exponent, delta, rel } = data
  const points = 2 ** exponent
  const relative = `${rel}%`

  const timeView = `${toFixed(time)}ms${
    delta !== null ? ` (next: -${delta}ms)` : ""
  }`

  const statsView1 = `${timeView.padEnd(25, " ")} Points: ${String(
    points,
  )}`.padEnd(44, " ")

  const statsView2 = `${relative.padEnd(20, " ")} Level: ${"*"
    .repeat(exponent)
    .padEnd(10, "-")}`.padEnd(39, " ")

  return `
    +--- AoC ${config.year} Day ${day} - AOC TIMER --------------------+
    |                                                    |
    ${renderSystem()}
    | Time: ${statsView1} |
    | Benchmark: ${statsView2} |
    |                                                    |
    +----------------------------------- git.io/JL9Qu ---+
`
}

export default renderDay
