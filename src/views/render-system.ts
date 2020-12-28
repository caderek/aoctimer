import * as os from "os"
import config from "../config"

const OS = {
  aix: "AIX",
  darwin: "MacOS",
  freebsd: "FreeBSD",
  linux: "Linux",
  openbsd: "OpenBSD",
  sunos: "SunOS",
  win32: "Windows",
}

const cpu = os.cpus()[0].model
const mem = Math.round(os.totalmem() / 10 ** 9)

const renderSystem = () => {
  const osView = `${OS[os.platform()]} (${os.arch()}) ${mem}GB RAM`.padEnd(
    50,
    " ",
  )

  const cpuView = cpu.padEnd(50, " ")

  const langView = config.language.padEnd(40, " ")

  return `
    | ${osView} |
    | ${cpuView} |
    |                                                    |
    | Language: ${langView} |
    |                                                    |
`.trim()
}

export default renderSystem
