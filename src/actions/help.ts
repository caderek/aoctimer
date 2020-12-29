const help = () => {
  console.log(`
AoC TIMER v.1.0.0

Commands:
  init                          Calibrate and create local config
  calibrate                     Recalibrate the timer
  summary                       Display the summary
  [-d, --day <day>] <command>   Run the timer for your command
  --help, -h                    Show help page

Examples:

  aoctimer init

  aoctimer node day01/index.js
  aoctimer python day5.py
  aoctimer day25.exe
  aoctimer -d 13 java my_solution
  aoctimer --day 15 lua solution.lua

  aoctimer summary
  `)
}

export default help
