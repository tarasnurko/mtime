import { ipcMain, IpcMainEvent, ipcRenderer, IpcRendererEvent } from 'electron'
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
      this.resetTimerProps()
    }
  }

  // -- interval interactions -- //

  private timer(_: IpcMainEvent) {
    this.calcTimeLeft()
    this.emitTimeLeftSend(_)

    this.interval = setInterval(() => {
      this.calcTimeLeft()

      this.calcTimerEnd(_)

      this.emitTimeLeftSend(_)
    }, 850)
  }

  public clearTimerInterval() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
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
  }

  private onStartTimer() {
    ipcMain.on(
      TIMER_EVENTS.START_TIMER,
      async (_: IpcMainEvent, time: number) => {
        if (this.status === TIMER_STATUS.IDLE) {
          console.log('onStartTimer')
          this.startTimer(time)
          this.timer(_)
        }
      }
    )
  }

  private onStartPause() {
    ipcMain.on(TIMER_EVENTS.START_PAUSE, async () => {
      if (this.status === TIMER_STATUS.PROCESS) {
        console.log('onStartPause')
        this.startPause()
        this.clearTimerInterval()
      }
    })
  }

  private onEndPause() {
    ipcMain.on(TIMER_EVENTS.END_PAUSE, async (_: IpcMainEvent) => {
      if (this.status === TIMER_STATUS.PAUSE) {
        console.log('onEndPause')
        this.endPause()
        this.timer(_)
      }
    })
  }

  private onStopTimer() {
    ipcMain.on(TIMER_EVENTS.STOP_TIMER, async () => {
      if (this.status !== TIMER_STATUS.IDLE) {
        console.log('onStopTimer')
        this.clearTimerInterval()
        this.stopTimer()
      }
    })
  }
}

const timer = new Timer()

export default timer
