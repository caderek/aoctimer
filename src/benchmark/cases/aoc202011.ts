import raw from "./aoc202011.input"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => x.split(""))

const factors = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
]

const neighborsWithDiagonals = (x, y, grid, seeThroughGaps: boolean) => {
  const h = grid.length
  const w = grid[0].length

  return factors
    .map(([yy, xx]) => {
      let i = 1
      while (true) {
        const xxx = x + xx * i
        const yyy = y + yy * i
        if (xxx < 0 || xxx >= w || yyy < 0 || yyy >= h) {
          return null
        }

        if (grid[yyy][xxx] !== ".") {
          return grid[yyy][xxx]
        }

        if (!seeThroughGaps) {
          return null
        }
        i++
      }
    })
    .filter((a) => a === "#").length
}

const round = (input, maxOccupied, seeThroughGaps = false) => {
  return input.map((row, y) =>
    row.map((v, x) => {
      if (v === ".") {
        return v
      }
      const n = neighborsWithDiagonals(x, y, input, seeThroughGaps)

      return v === "L" && n === 0 ? "#" : v === "#" && n > maxOccupied ? "L" : v
    }),
  )
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  let prev = input
  while (true) {
    // render(prev, "PART 1")
    const next = round(prev, 3)

    if (JSON.stringify(prev) === JSON.stringify(next)) {
      return next.flat().filter((v) => v === "#").length
    }
    prev = next
  }
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  let prev = input
  while (true) {
    // render(prev, "PART 2")
    const next = round(prev, 4, true)

    if (JSON.stringify(prev) === JSON.stringify(next)) {
      return next.flat().filter((v) => v === "#").length
    }
    prev = next
  }
}

export default () => {
  goA(raw)
  goB(raw)
}
