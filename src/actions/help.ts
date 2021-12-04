const help = () => {
  console.log(`
AoC TIMER v.3.0.4

Commands:
  init [language] [year]        Calibrate and create local config
  summary                       Display the summary
  [-d, --day <day>] <command>   Run the timer for your command
  --help, -h                    Show help page
  --version, -v                 Show version

Examples:

  aoctimer init

  aoctimer node day01/index.js
  aoctimer python day5.py
  aoctimer day25.exe
  aoctimer go run aoc/day01/solution.go
  aoctimer -d 13 java my_solution
  aoctimer --day 15 lua solution.lua

  aoctimer summary
  `)
}

export default help
