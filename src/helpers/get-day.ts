const getDay = (command: string | null) => {
  if (command === null) {
    return "??"
  }

  const dayData = command.replace(/20\d{2}/, "").match(/\d?\d/g)

  if (dayData === null) {
    return "??"
  }

  const day = Number(dayData[dayData.length - 1])

  if (day < 1 || day > 25) {
    return "??"
  }

  return String(day).padStart(2, "0")
}

export default getDay
