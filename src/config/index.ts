const fs = require("fs")
const path = require("path")
import { name } from "../../package.json"

type Day = {
  day: number
  level: number
  score: number
  rel: number
  time: number
}

type Data = {
  version?: string
  year?: string
  benchmark?: number
  language?: string
  days?: Day[]
}

const fileName = `${name}.json`

const configDir = process.cwd()
const configFile = path.join(configDir, fileName)

const check = () => {
  return fs.existsSync(configFile)
}

const load = () => {
  return check()
    ? JSON.parse(fs.readFileSync(configFile, { encoding: "utf8" }))
    : {}
}

const save = (data: Data) => {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }

  let content = fs.existsSync(configFile) ? load() : {}

  fs.writeFileSync(configFile, JSON.stringify({ ...content, ...data }, null, 2))
}

export { check, save, load, Day, Data }
export default load()
