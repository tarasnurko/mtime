import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

import { TIMER_STATUS } from '../timer/constants'
import { PROGRESSBAR_EVENTS } from './'

interface IEmitMakeProgressBar {
  _: IpcMainEvent
  status: TIMER_STATUS
  startTime: Date | null
  endTime: Date | null
  timeLeft: number | null
}

const emitMakeProgressBar = ({
  _,
  status,
  startTime,
  endTime,
  timeLeft,
}: IEmitMakeProgressBar) => {
  ipcMain.emit(PROGRESSBAR_EVENTS.MAKE_PROGRESSBAR, _, {
    status,
    startTime,
    endTime,
    timeLeft,
  })
}

interface IOnMakeProgressBarData {
  status: TIMER_STATUS
  startTime: Date | null
  endTime: Date | null
  timeLeft: number | null
}

const onMakeProgressBar = (browserWindow: BrowserWindow | null) => {
  ipcMain.on(
    PROGRESSBAR_EVENTS.MAKE_PROGRESSBAR,
    (
      event: IpcMainEvent,
      { status, startTime, endTime, timeLeft }: IOnMakeProgressBarData
    ) => {
      if (
        status === TIMER_STATUS.IDLE ||
        startTime === null ||
        endTime === null ||
        timeLeft === null
      ) {
        browserWindow?.setProgressBar(-1)
      } else {
        const differenceTime = endTime.getTime() - startTime.getTime()

        // const percentageTimeLeft = parseFloat(
        //   (timeLeft / differenceTime).toFixed(2)
        // )

        let percentageTimeLeft =
          Math.round((1 - timeLeft / differenceTime + Number.EPSILON) * 100) /
          100

        if (percentageTimeLeft < 0.01) percentageTimeLeft = 0.01

        console.log(`ProgressBar: ${percentageTimeLeft}`)

        browserWindow?.setProgressBar(percentageTimeLeft)
      }
    }
  )
}

const emitStopProgressBar = () => {
  ipcMain.emit(PROGRESSBAR_EVENTS.STOP_PROGRESSBAR)
}

const onStopProgressBar = (browserWindow: BrowserWindow | null) => {
  ipcMain.on(PROGRESSBAR_EVENTS.STOP_PROGRESSBAR, () => {
    browserWindow?.setProgressBar(-1)
  })
}

export {
  emitMakeProgressBar,
  onMakeProgressBar,
  emitStopProgressBar,
  onStopProgressBar,
}
