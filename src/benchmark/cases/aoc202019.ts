import raw from "./aoc202019.input"

const prepareInput = (rawInput: string) => {
  const [rawRules, rawCodes] = rawInput.split("\n\n")

  const rules = Object.fromEntries(
    rawRules
      .split("\n")
      .map((line) => line.split(": "))
      .map(([id, rule]) => [
        id,
        rule.match(/[ab]/)
          ? rule.slice(1, -1)
          : rule.split(" | ").map((ids) => ids.split(" ")),
      ]),
  )

  return { rules, codes: rawCodes.split("\n") }
}

function* runSeq(rules, seq, code) {
  if (seq.length === 0) {
    yield code
  } else {
    const [currSeq, ...rest] = seq
    for (const currCode of run(rules, currSeq, code)) {
      yield* runSeq(rules, rest, currCode)
    }
  }
}

function* runAlt(rules, alt, code) {
  for (const seq of alt) {
    yield* runSeq(rules, seq, code)
  }
}

function* run(rules, id, code) {
  if (Array.isArray(rules[id])) {
    yield* runAlt(rules, rules[id], code)
  } else {
    if (code && code[0] === rules[id]) {
      yield code.slice(1)
    }
  }
}

const match = (rules, code) => {
  for (const m of run(rules, "0", code)) {
    if (m === "") {
      return true
    }
  }
  return false
}

const goA = (rawInput: string) => {
  const { rules, codes } = prepareInput(rawInput)

  return codes.filter((code) => match(rules, code)).length
}

const goB = (rawInput: string) => {
  const { rules, codes } = prepareInput(rawInput)
  const modifiedRules = {
    ...rules,
    "8": [["42"], ["42", "8"]],
    "11": [
      ["42", "31"],
      ["42", "11", "31"],
    ],
  }

  return codes.filter((code) => match(modifiedRules, code)).length
}

export default () => {
  goA(raw)
  goB(raw)
}
