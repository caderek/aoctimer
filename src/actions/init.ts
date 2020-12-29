import * as readline from "readline"
import benchmark from "../benchmark"
import { save } from "../config"
import calibrate from "./calibrate"
import { version } from "../../package.json"

const ask = (rl, question) =>
  new Promise((resolve) => rl.question(question, resolve))

const init = async () => {
  console.log("Initializing")

  const yearData = process.cwd().match(/20\d{2}/)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const year = await ask(
    rl,
    `Year${yearData ? ` (default ${yearData[0]})` : ""}: `,
  )
  const language = await ask(rl, "Language: ")

  rl.close()

  save({
    version,
    year: (year ? year : yearData[0]) as string,
    language: (language || "unknown") as string,
    days: [],
  })

  calibrate()

  console.log("Done!")
}

export default init
