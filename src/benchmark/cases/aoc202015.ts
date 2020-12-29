const raw = `13,16,0,12,15,1`

const prepareInput = (rawInput: string) => rawInput.split(",").map(Number)

const go = (rawInput: string, maxTurn: number) => {
  const input = prepareInput(rawInput)

  let last = input[input.length - 1]
  let turn = input.length

  const turnsPerNum = new Uint32Array(maxTurn)
  input.slice(0, -1).forEach((x, i) => (turnsPerNum[x] = i + 1))

  while (turn < maxTurn) {
    const val = turnsPerNum[last]

    turnsPerNum[last] = turn
    last = val ? turn - val : 0
    turn++
  }

  return last
}

export default () => {
  go(raw, 2020)
  go(raw, 30000000)
}
