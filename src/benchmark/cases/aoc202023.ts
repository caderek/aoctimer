const raw = "487912365"

const prepareInput = (rawInput: string) => rawInput.split("").map(Number)

const mod = (a: number, b: number) => {
  const x = a % b
  return x < 0 ? x + b : x
}

const getDest = (picked: number[], start: number, len: number) => {
  let dest = 0
  let sub = 1

  while (
    picked[0] === dest ||
    picked[1] === dest ||
    picked[2] === dest ||
    dest === 0
  ) {
    dest = mod(start - sub++, len)
  }

  return dest
}

const play = (
  rawInput: string,
  maxTurn: number,
  takeN: number,
  size: number,
) => {
  const cups = prepareInput(rawInput)
  const links = new Uint32Array(size + 1).map((_, i) => i + 1)

  links[links.length - 1] = cups[0]

  cups.forEach((num, i) => {
    links[num] =
      i < cups.length - 1
        ? cups[i + 1]
        : cups.length < links.length - 1
        ? cups.length + 1
        : cups[0]
  })

  const len = links.length
  const picked = new Array(3)

  let start = cups[0]

  while (maxTurn--) {
    picked[0] = links[start]
    picked[1] = links[picked[0]]
    picked[2] = links[picked[1]]
    const next = links[picked[2]]
    links[start] = next

    const dest = getDest(picked, start, len)
    const end = links[dest]
    links[dest] = picked[0]
    links[picked[2]] = end

    start = next
  }

  const result = [links[1]]

  while (--takeN) {
    result.push(links[result[result.length - 1]])
  }

  return result
}

const goA = (rawInput: string) => {
  return Number(play(rawInput, 100, 8, 9).join(""))
}

const goB = (rawInput: string) => {
  return play(rawInput, 10000000, 2, 1000000).reduce((a, b) => a * b)
}

export default () => {
  goA(raw)
  goB(raw)
}
