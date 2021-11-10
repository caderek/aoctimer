import benchmark from "../benchmark"
import { save } from "../config"

const calibrate = () => {
  console.log("Calibrating (it may take a while)...")
  const bench = benchmark()
  save({ benchmark: bench })
  console.log("Calibrated!")
}

export default calibrate
