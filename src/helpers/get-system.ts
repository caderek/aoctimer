import * as os from "os"

const OS = {
  aix: "AIX",
  darwin: "MacOS",
  freebsd: "FreeBSD",
  linux: "Linux",
  openbsd: "OpenBSD",
  sunos: "SunOS",
  win32: "Windows",
}

const getSystem = () => {
  const cpu = os.cpus()[0].model
  const mem = Math.round(os.totalmem() / 10 ** 9)
  const platform = OS[os.platform()]
  const arch = os.arch()

  return {
    cpu,
    mem,
    platform,
    arch,
    toString() {
      return `${cpu}|${arch}|${platform}|${mem}GB`
    },
  }
}

export default getSystem
