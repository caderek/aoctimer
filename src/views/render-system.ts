import config from "../config"
import getSystem from "../helpers/get-system"

const renderSystem = () => {
  const { platform, arch, cpu, mem } = getSystem()

  const osView = `${platform} (${arch}) ${mem}GB RAM`.padEnd(50, " ")

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
