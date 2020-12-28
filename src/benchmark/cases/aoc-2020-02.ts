import raw from "./aoc-2020-02.input"

const prepareInput = (raw: string) =>
  raw.split("\n").map((item) => {
    const [range, letter, password] = item.split(" ")
    const [min, max] = range.split("-").map(Number)
    return { min, max, letter: letter[0], password }
  })

const goA = (raw: string) => {
  const input = prepareInput(raw)

  return input.reduce((counter, item) => {
    // @ts-ignore
    const count = [...item.password.matchAll(item.letter)].length
    return count >= item.min && count <= item.max ? counter + 1 : counter
  }, 0)
}

const goB = (raw: string) => {
  const input = prepareInput(raw)

  return input.reduce(
    (counter, item) =>
      Number(item.password[item.min - 1] === item.letter) ^
      Number(item.password[item.max - 1] === item.letter)
        ? counter + 1
        : counter,
    0,
  )
}

export default () => {
  goA(raw)
  goB(raw)
}
