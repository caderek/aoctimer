import * as readline from "readline"
import benchmark from "../benchmark"
import { save } from "../config"
import calibrate from "./calibrate"

const ask = (rl, question): Promise<string> =>
  new Promise((resolve) => rl.question(question, resolve))

const init = async () => {
  console.log("Initializing")

  const commandPos = process.argv.indexOf("init")
  let [language, year] = process.argv.slice(commandPos + 1)

  const yearData = process.cwd().match(/20\d{2}/)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  if (year === undefined) {
    year = await ask(rl, `Year${yearData ? ` (default ${yearData[0]})` : ""}: `)
  }

  if (language === undefined) {
    language = await ask(rl, "Language: ")
  }

  rl.close()

  save({
    version: "2.0.0",
    year: (year ? year : yearData[0]) as string,
    language: (language || "unknown") as string,
    days: [],
  })

  calibrate()

  console.log("Done!")
}

export default init
