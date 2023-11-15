import * as timePrinter from "./terminal-timer/src/timePrinter"
import * as userNotifier from "./terminal-timer/src/userNotifier"
import { getSeconds } from "./terminal-timer/src/inputParser"
import * as inputReader from "./terminal-timer/src/inputReader"

async function main() {
  let timeStr = await inputReader.getTimeStr()
  let seconds = getSeconds(timeStr)

  while (!seconds) {
    timeStr = await inputReader.getSdinStr()
    seconds = getSeconds(timeStr)
  }

  run(seconds)
  inputReader.close()
}

function run(seconds: number) {
  let i = 0
  const interval = setInterval(() => {
    i++

    if (i > seconds) {
      clearInterval(interval)
      userNotifier.notify()
    } else {
      timePrinter.printTime(seconds - i)
    }
  }, 1000)
}

main()
