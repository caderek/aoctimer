const getYearAndDay = (config) => {
  let info = `${process.cwd()} ${process.argv.slice(3).join(" ")}`
  const yearData = info.match(/20\d{2}/)

  if (yearData) {
    info = info.replace(yearData[0], "")
  }

  const dayData = info.match(/\d?\d/)

  const year = config.year ? config.year : yearData ? yearData[0] : "????"
  const day = dayData ? dayData[0].padStart(2, "0") : "??"

  return { year, day }
}

export default getYearAndDay
