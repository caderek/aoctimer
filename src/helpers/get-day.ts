const getDay = () => {
  const dayData = `${process.cwd()} ${process.argv.slice(3).join(" ")}`
    .replace(/20\d{2}/, "")
    .match(/\d?\d/)

  return dayData ? dayData[0].padStart(2, "0") : "??"
}

export default getDay
