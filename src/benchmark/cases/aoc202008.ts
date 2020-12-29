import raw from "./aoc202008.input"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [opcode, val] = line.split(" ")

    return [opcode, Number(val)]
  })

const compute = (program: [string, number][]) => {
  const positions = new Set()
  let pointer = 0
  let acc = 0
  let info = ""

  while (true) {
    if (positions.has(pointer) || pointer === program.length) {
      info = pointer === program.length ? "exit" : "loop"
      break
    }

    positions.add(pointer)

    const [opcode, val] = program[pointer]

    switch (opcode) {
      case "acc": {
        acc += val
        pointer++
        break
      }
      case "nop": {
        pointer++
        break
      }
      case "jmp": {
        pointer += val
        break
      }
    }
  }

  return { acc, info }
}

const goA = (rawInput: string) => {
  const program = prepareInput(rawInput) as [string, number][]
  return compute(program).acc
}

const goB = (rawInput: string) => {
  const program = prepareInput(rawInput) as [string, number][]

  for (let i = 0; i < program.length; i++) {
    const copy = JSON.parse(JSON.stringify(program))

    if (copy[i][0] === "acc") {
      continue
    } else if (copy[i][0] === "nop") {
      copy[i][0] = "jmp"
    } else {
      copy[i][0] = "nop"
    }

    const result = compute(copy)

    if (result.info === "exit") {
      return result.acc
    }
  }
}

export default () => {
  goA(raw)
  goB(raw)
}
