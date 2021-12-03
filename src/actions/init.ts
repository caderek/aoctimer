import * as readline from "readline"
import { save } from "../config"
import getSystem from "../helpers/get-system"
import benchmark from "../benchmark"

const ask = (rl, question): Promise<string> =>
  new Promise((resolve) => rl.question(question, resolve))

const init = async ({ language, year }) => {
  console.log("Initializing AoC timer...")

  const yearData = process.cwd().match(/20\d{2}/)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  if (language === undefined) {
    language = await ask(rl, "Language: ")
  }

  if (year === undefined) {
    year = await ask(rl, `Year${yearData ? ` (default ${yearData[0]})` : ""}: `)
  }

  rl.close()

  console.log("Calibrating (it may take a while)...")
  const bench = benchmark()

  save({
    version: "3.0.2",
    year: (year ? year : yearData[0]) as string,
    language: (language || "unknown") as string,
    system: getSystem().toString(),
    benchmark: bench,
    days: [],
  })

  console.log("Done!")
}

export default init
