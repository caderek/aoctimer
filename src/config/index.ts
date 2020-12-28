const fs = require("fs")
const path = require("path")
import { name, version } from "../../package.json"

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

const save = (data: { [key: string]: string | number }) => {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }

  let content = fs.existsSync(configFile) ? load() : {}

  fs.writeFileSync(configFile, JSON.stringify({ ...content, ...data }, null, 2))
}

export { check, save, load }
export default load()
