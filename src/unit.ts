const fs = require("fs")
const path = require("path")
const { platform, homedir } = require("os")
import { name, version } from "../package.json"

const folderName = name
const fileName = `${name}_${version.replace(/\./g, "_")}.json`

const configBasePath = {
  linux: ".config",
  darwin: "Library/Preferences",
  win32: "AppData/Roaming",
}

const home = homedir()
const configDir = path.join(home, configBasePath[platform()], folderName)
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
