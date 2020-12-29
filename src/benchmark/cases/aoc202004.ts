import raw from "./aoc202004.input"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((row) =>
      row
        .split("\n")
        .map((line) => line.split(" "))
        .flat(),
    )
    .map((entry) => Object.fromEntries(entry.map((field) => field.split(":"))))

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

  return input.filter((item) => {
    const keys = Object.keys(item)

    return requiredFields.every((x) => keys.includes(x))
  })
}

const goB = (rawInput: string) => {
  const input = goA(rawInput)
  const validation = {
    byr: (val) =>
      val.match(/^\d{4}$/) && Number(val) >= 1920 && Number(val) <= 2002,
    iyr: (val) =>
      val.match(/^\d{4}$/) && Number(val) >= 2010 && Number(val) <= 2020,
    eyr: (val) =>
      val.match(/^\d{4}$/) && Number(val) >= 2020 && Number(val) <= 2030,
    hgt: (val) => {
      if (val.match(/^\d+(cm|in)$/) == null) {
        return false
      }

      const amount = Number(val.slice(0, -2))
      const unit = val.slice(-2)

      return unit === "cm"
        ? amount >= 150 && amount <= 193
        : amount >= 59 && amount <= 76
    },
    hcl: (val) => val.match(/^#[0-9a-f]{6}$/),
    ecl: (val) => val.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
    pid: (val) => val.match(/^\d{9}$/),
    cid: (val) => true,
  }

  return input.filter((item) =>
    Object.entries(item).every(([key, val]) => validation[key](val)),
  )
}

export default () => {
  goA(raw)
  goB(raw)
}
