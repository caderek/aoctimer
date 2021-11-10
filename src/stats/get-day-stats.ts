import config from "../config"

const getDayStats = (rawTime: bigint) => {
  const base = Math.ceil(config.benchmark / 1000000)
  const time = Number(rawTime) / 1000000

  const thresholds = [
    [1, base],
    [2, base * 0.5],
    [3, base * 0.2],
    [4, base * 0.1],
    [5, base * 0.05],
    [6, base * 0.02],
    [7, base * 0.01],
    [8, base * 0.005],
    [9, base * 0.002],
    [10, base * 0.001],
  ]

  const next = thresholds.find(([_, v]) => v < time)
  const delta = next ? Math.ceil(time - next[1]) : null
  const prev = thresholds.reverse().find(([_, v]) => time < v)
  const exponent = prev ? prev[0] : 0
  const rel = Math.ceil((time / base) * 100000) / 1000

  return { time, exponent, delta, rel }
}

export default getDayStats
