import {
  ipcMain,
  IpcMainEvent,
  ipcRenderer,
  IpcRendererEvent,
  Notification,
} from 'electron'

import { TIMER_EVENTS, TIMER_STATUS } from './constants'

class Timer {
  private status: TIMER_STATUS
  private endTime: Date | null
  private pauseStartTime: Date | null
  private timeLeft: number | null
  private interval: ReturnType<typeof setInterval> | null

  constructor() {
    this.status = TIMER_STATUS.IDLE
    this.endTime = null
    this.pauseStartTime = null
    this.timeLeft = null
    this.interval = null
  }

  private resetTimerProps() {
    this.status = TIMER_STATUS.IDLE
    this.endTime = null
    this.pauseStartTime = null
    this.timeLeft = null
  }

  // -- base -- //

  private startTimer(time: number) {
    this.status = TIMER_STATUS.PROCESS
    this.endTime = new Date(Date.now() + time)
  }

  private startPause() {
    this.status = TIMER_STATUS.PAUSE
    this.pauseStartTime = new Date()

    this.clearTimerInterval()
  }

  private endPause() {
    if (!this.pauseStartTime || !this.endTime) return

    this.status = TIMER_STATUS.PROCESS
    this.endTime = new Date(
      this.endTime.getTime() + (Date.now() - this.pauseStartTime.getTime())
    )

    this.pauseStartTime = null
  }

  private stopTimer() {
    this.resetTimerProps()
    this.clearTimerInterval()
  }

  private endTimer() {
    this.resetTimerProps()
    this.clearTimerInterval()
  }

  // -- calculating functions -- //

  private calcTimeLeft() {
    if (!this.endTime) return
    this.timeLeft = this.endTime.getTime() - Date.now()
  }

  private calcTimerEnd(_: IpcMainEvent) {
    if (!this.endTime || !this.timeLeft) return

    if (this.timeLeft <= 0) {
      this.emitTimerEnd(_)
      this.clearTimerInterval()
      this.endTimerInterval(_)
      this.showEndTimerNotification()
    }
  }

  // -- interval interactions -- //

  private startTimerInterval(_: IpcMainEvent) {
    this.calcTimeLeft()
    this.emitTimeLeftSend(_)

    this.interval = setInterval(() => {
      this.calcTimeLeft()

      this.calcTimerEnd(_)

      this.emitTimeLeftSend(_)
    }, 700)
  }

  public clearTimerInterval() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  private endTimerInterval(_: IpcMainEvent) {
    this.interval = setInterval(() => {
      this.emitTimerEnd(_)
    }, 200)
  }

  // -- ipcRenderer -- //

  public sendStartTimer(time: number) {
    ipcRenderer.send(TIMER_EVENTS.START_TIMER, time)
  }

  public sendStartPause() {
    ipcRenderer.send(TIMER_EVENTS.START_PAUSE)
  }

  public sendEndPause() {
    ipcRenderer.send(TIMER_EVENTS.END_PAUSE)
  }

  public sendStopTimer() {
    ipcRenderer.send(TIMER_EVENTS.STOP_TIMER)
  }

  public sendReceiveTimerEnd() {
    ipcRenderer.send(TIMER_EVENTS.RECEIVE_TIMER_END)
  }

  // -- go to renderer -- //

  private emitTimeLeftSend(_: IpcMainEvent) {
    _.sender.send(TIMER_EVENTS.GET_TIME, this.timeLeft)
  }

  private emitTimerEnd(_: IpcMainEvent) {
    _.sender.send(TIMER_EVENTS.END_TIMER)
  }

  public getTime(callback: Function) {
    const subscription = (event: IpcRendererEvent, data: number) =>
      callback(data)

    ipcRenderer.on(TIMER_EVENTS.GET_TIME, subscription)

    return () => ipcRenderer.removeListener(TIMER_EVENTS.GET_TIME, subscription)
  }

  public getTimerEnd(callback: Function) {
    const subscription = () => callback()

    ipcRenderer.on(TIMER_EVENTS.END_TIMER, subscription)

    return () =>
      ipcRenderer.removeListener(TIMER_EVENTS.END_TIMER, subscription)
  }

  // -- ipcMain -- //

  public registerIpcListeners() {
    this.onStartTimer()
    this.onStartPause()
    this.onEndPause()
    this.onStopTimer()
    this.onEndTimerReceived()
  }

  private onStartTimer() {
    ipcMain.on(
      TIMER_EVENTS.START_TIMER,
      async (_: IpcMainEvent, time: number) => {
        if (this.status === TIMER_STATUS.IDLE) {
          console.log('onStartTimer')
          this.startTimer(time)
          this.startTimerInterval(_)
        }
      }
    )
  }

  private onStartPause() {
    ipcMain.on(TIMER_EVENTS.START_PAUSE, async () => {
      if (this.status === TIMER_STATUS.PROCESS) {
        console.log('onStartPause')
        this.startPause()
      }
    })
  }

  private onEndPause() {
    ipcMain.on(TIMER_EVENTS.END_PAUSE, async (_: IpcMainEvent) => {
      if (this.status === TIMER_STATUS.PAUSE) {
        console.log('onEndPause')
        this.endPause()
        this.startTimerInterval(_)
      }
    })
  }

  private onStopTimer() {
    ipcMain.on(TIMER_EVENTS.STOP_TIMER, async () => {
      if (this.status !== TIMER_STATUS.IDLE) {
        console.log('onStopTimer')
        this.stopTimer()
      }
    })
  }

  private onEndTimerReceived() {
    ipcMain.on(TIMER_EVENTS.RECEIVE_TIMER_END, async () => {
      if (this.status === TIMER_STATUS.PROCESS) {
        console.log('onReceiveTimerEnd')
        this.endTimer()
      }
    })
  }

  // -- notifications -- //

  private showEndTimerNotification() {
    const notification = new Notification({
      title: 'Ntime',
      body: 'Time is up!',
    })

    notification.show()

    notification.on('click', () => {
      ipcMain.emit('open-main-window')
    })

    // doesn't save in notifications list
    notification.on('close', () => {
      notification.close()
    })
  }
}

const timer = new Timer()

export default timer
