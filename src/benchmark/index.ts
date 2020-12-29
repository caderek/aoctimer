import aoc201522 from "./cases/aoc201522"
import aoc201525 from "./cases/aoc201525"
import aoc201902 from "./cases/aoc201902"
import aoc201924 from "./cases/aoc201924"
import aoc202002 from "./cases/aoc202002"
import aoc202004 from "./cases/aoc202004"
import aoc202008 from "./cases/aoc202008"
import aoc202010 from "./cases/aoc202010"
import aoc202011 from "./cases/aoc202011"
import aoc202014 from "./cases/aoc202014"
import aoc202015 from "./cases/aoc202015"
import aoc202019 from "./cases/aoc202019"
import aoc202020 from "./cases/aoc202020"
import aoc202022 from "./cases/aoc202022"
import aoc202023 from "./cases/aoc202023"
import aoc202024 from "./cases/aoc202024"

const run = () => {
  aoc201522()
  aoc201525()
  aoc201902()
  aoc201924()
  aoc202002()
  aoc202004()
  aoc202008()
  aoc202010()
  aoc202011()
  aoc202014()
  aoc202015()
  aoc202019()
  aoc202020()
  aoc202022()
  aoc202023()
  aoc202024()
}

const benchmark = () => {
  const start = process.hrtime.bigint()
  run()
  run()
  run()
  const time = Math.ceil(Number(process.hrtime.bigint() - start) / 3)
  return time
}

export default benchmark
