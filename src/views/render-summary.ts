import config, { Day } from "../config"
import renderSystem from "./render-system"

const renderSummary = (year: string, days: Day[]) => {
  const daysView = days
    .sort((a, b) => (a.day > b.day ? 1 : b.day > a.day ? -1 : 0))
    .map((item) => {
      const timeView = `${item.time}ms`

      const statsView1 = `${timeView.padEnd(25, " ")} Points: ${String(
        item.score,
      )}`.padEnd(44, " ")

      const statsView2 = `${`${item.rel}%`.padEnd(21, " ")} Level: ${"★"
        .repeat(item.level)
        .padEnd(10, "☆")}`.padEnd(40, " ")

      return `
    | Day ${item.day}                                             |
    | ------                                             |
    | Time: ${statsView1} |
    | Relative: ${statsView2} |
    |                                                    |`
    })
    .join("")
    .replace(/^\n/, "")
    .replace(/^\s{4}/, "")

  const completedView = `Completed: ${days.length} / 25`

  const totalTimeView = `Total time: ${days
    .map((v) => v.time)
    .reduce((a, b) => a + b)}ms`

  const relativeAvgView = `Relative (average): ${(
    days.map((v) => v.rel).reduce((a, b) => a + b) / days.length
  ).toFixed(3)}%`

  const totalScoreView = `Total score: ${days
    .map((v) => v.score)
    .reduce((a, b) => a + b)}`

  const levelAvg = Math.round(
    days.map((v) => v.level).reduce((a, b) => a + b) / days.length,
  )

  const levelAvgView = `Level (average): ${"★"
    .repeat(levelAvg)
    .padEnd(10, "☆")}`

  const summary = `
    | ${completedView.padEnd(50, " ")} |
    |                                                    |
    | ${totalTimeView.padEnd(50, " ")} |
    | ${relativeAvgView.padEnd(50, " ")} |
    |                                                    |
    | ${totalScoreView.padEnd(50, " ")} |
    | ${levelAvgView.padEnd(50, " ")} |`
    .replace(/^\n/, "")
    .replace(/^\s{4}/, "")

  return `
    +--- AoC ${config.year} - AOC TIMER ---------------------------+
    |                                                    |
    ${renderSystem()}
    |--- DAYS -------------------------------------------|
    |                                                    |
    ${daysView}
    |--- SUMMARY ----------------------------------------|
    |                                                    |
    ${summary}
    |                                                    |
    +----------------------------------- git.io/JL9Qu ---+
`
}

export default renderSummary
