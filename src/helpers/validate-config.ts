import config, { check } from "../config"
import getSystem from "./get-system"

const validateConfig = () => {
  if (!check() || !config.benchmark) {
    console.log("Please run 'aoctimer init' first.")
    return false
  }

  if (config.system !== getSystem().toString()) {
    console.log(`
It seems that you are using a different system.
Please recalibrate by running \`aoctimer calibrate\`.
`)
    return false
  }

  return true
}

export default validateConfig
