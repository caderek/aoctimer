import getYearAndDay from "../helpers/get-year-and-day"
import stats from "../stats"
import config from "../config"
import renderSystem from "./render-system"

const renderDay = (rawTime: bigint) => {
  const { time, exponent, delta, rel } = stats.day(rawTime, config)
  const points = 2 ** exponent
  const relative = `${rel}%`
  const { year, day } = getYearAndDay(config)

  const timeView = `${time}ms${delta !== null ? ` (next: -${delta}ms)` : ""}`

  const statsView1 = `${timeView.padEnd(25, " ")} Points: ${String(
    points,
  )}`.padEnd(44, " ")

  const statsView2 = `${relative.padEnd(21, " ")} Level: ${"★"
    .repeat(exponent)
    .padEnd(10, "☆")}`.padEnd(40, " ")

  const summary = `
    +--- AoC ${year} Day ${day} - AOC TIMER --------------------+
    |                                                    |
    ${renderSystem()}
    | Time: ${statsView1} |
    | Relative: ${statsView2} |
    |                                                    |
    +--------------------------- aoctimer.netlify.app ---+
`

  return summary
}

export default renderDay
