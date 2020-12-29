import config from "../config"
import renderSystem from "./render-system"

const renderDay = (day: string | null, data: any) => {
  const { time, exponent, delta, rel } = data
  const points = 2 ** exponent
  const relative = `${rel}%`

  const timeView = `${time}ms${delta !== null ? ` (next: -${delta}ms)` : ""}`

  const statsView1 = `${timeView.padEnd(25, " ")} Points: ${String(
    points,
  )}`.padEnd(44, " ")

  const statsView2 = `${relative.padEnd(21, " ")} Level: ${"★"
    .repeat(exponent)
    .padEnd(10, "☆")}`.padEnd(40, " ")

  return `
    +--- AoC ${config.year} Day ${day} - AOC TIMER --------------------+
    |                                                    |
    ${renderSystem()}
    | Time: ${statsView1} |
    | Relative: ${statsView2} |
    |                                                    |
    +--------------------------- aoctimer.netlify.app ---+
`
}

export default renderDay
