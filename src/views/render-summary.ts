import config, { Day } from "../config"
import toFixed from "../helpers/to-fixed"
import renderSystem from "./render-system"

const renderSummary = (year: string, days: Day[]) => {
  const daysView = days
    .sort((a, b) => (a.day > b.day ? 1 : b.day > a.day ? -1 : 0))
    .map((item) => {
      const timeView = `${toFixed(item.time)}ms`

      const statsView1 = `${timeView.padEnd(25, " ")} Points: ${String(
        item.score,
      )}`.padEnd(44, " ")

      const statsView2 = `${`${item.rel}%`.padEnd(20, " ")} Level: ${"*"
        .repeat(item.level)
        .padEnd(10, "-")}`.padEnd(39, " ")

      return `
    | Day ${item.day}                                             |
    | ------                                             |
    | Time: ${statsView1} |
    | Benchmark: ${statsView2} |
    |                                                    |`
    })
    .join("")
    .replace(/^\n/, "")
    .replace(/^\s{4}/, "")

  const completedView = `Completed: ${days.length} / 25`

  const totalTime = days.map((v) => v.time).reduce((a, b) => a + b, 0)

  const relativeAvg =
    days.length > 0
      ? (days.map((v) => v.rel).reduce((a, b) => a + b) / days.length).toFixed(
          3,
        )
      : 0

  const totalScore = days.map((v) => v.score).reduce((a, b) => a + b, 0)

  const levelAvg =
    days.length > 0
      ? Math.round(
          days.map((v) => v.level).reduce((a, b) => a + b) / days.length,
        )
      : 0

  const totalTimeView = `Total time: ${toFixed(totalTime)}ms`
  const relativeAvgView = `Benchmark (average): ${relativeAvg}%`
  const totalScoreView = `Total score: ${totalScore}`
  const levelAvgView = `Level (average): ${"*"
    .repeat(levelAvg)
    .padEnd(10, "-")}`

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
