const extractTime = (data: string, prefix: string = "") => {
  const totalTimeRegex = /total.+/gi
  const timeRegex = /\d+\.*\d*\s*[smnu]{0,1}s{0,1}/i

  const entries = (`${prefix}${data}`.match(totalTimeRegex) ?? [])
    .filter((line) => timeRegex.test(line))
    .map((line) => line.match(timeRegex)[0])

  if (entries.length > 0) {
    const time = Number(entries[0].match(/\d+\.*\d*/)[0])
    const unit = (entries[0].match(/(s|m|n|u){0,1}s{1}/i) ?? [])[0]

    let timeNanoseconds: bigint

    switch (typeof unit === "string" ? unit.toLowerCase() : unit) {
      case "s":
        timeNanoseconds = BigInt(time * 1e9)
        break
      case "ms":
        timeNanoseconds = BigInt(time * 1e6)
        break
      case "us":
        timeNanoseconds = BigInt(time * 1e3)
        break
      case "ns":
        timeNanoseconds = BigInt(time)
        break
      default:
        timeNanoseconds = BigInt(time * 1e6)
        break
    }

    return timeNanoseconds
  }

  return null
}

export default extractTime
