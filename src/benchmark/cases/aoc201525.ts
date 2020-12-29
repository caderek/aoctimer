const raw =
  "To continue, please consult the code grid in the manual.  Enter the code at row 2978, column 3083."

const prepareInput = (rawInput: string) => rawInput.match(/\d+/g).map(Number)

const go = (rawInput: string) => {
  const [row, col] = prepareInput(rawInput)

  const prevDiagonals = row + col - 2
  const nth = (prevDiagonals * (prevDiagonals + 1)) / 2 + col

  let code = 20151125

  for (let i = 1; i < nth; i++) {
    code = (code * 252533) % 33554393
  }

  return code
}

export default () => {
  go(raw)
}
