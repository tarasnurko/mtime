import { ipcMain, IpcMainEvent, ipcRenderer } from 'electron'
import { TIMER_EVENTS, TIMER_STATUS } from './constants'

class Timer {
  private status: TIMER_STATUS
  private endTime: Date | null
  private pauseStartTime: Date | null
  private leftTime: number | null
  private interval: ReturnType<typeof setInterval> | null

  constructor() {
    this.status = TIMER_STATUS.IDLE
    this.endTime = null
    this.pauseStartTime = null
    this.leftTime = null
    this.interval = null
  }

  public startTimer(time: number) {
    this.status = TIMER_STATUS.PROCESS
    this.endTime = new Date(Date.now() + time)
  }

  public calcLeftTime() {
    if (!this.endTime) return
    this.leftTime = this.endTime.getTime() - Date.now()
  }

  public timer(_: IpcMainEvent) {
    this.interval = setInterval(() => {
      this.calcLeftTime()
      this.emitLeftTimeSend(_)
    }, 150)
  }

  public clearTimer() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  // -- ipcRenderer -- //

  public sendStartTimer(time: number) {
    // should be if there or onSendStartTimer
    ipcRenderer.send(TIMER_EVENTS.START_TIMER, time)
  }

  public emitLeftTimeSend(_: IpcMainEvent) {
    _.sender.send(TIMER_EVENTS.GET_TIME, this.leftTime)
  }

  public getTime(callback: Function) {
    ipcRenderer.on(TIMER_EVENTS.GET_TIME, (_, data) => {
      callback(data)
    })
  }

  // -- ipcMain -- //

  public registerIpcListeners() {
    this.onSendStartTimer()
  }

  public onSendStartTimer() {
    ipcMain.on(
      TIMER_EVENTS.START_TIMER,
      async (_: IpcMainEvent, time: number) => {
        this.startTimer(time)
        this.timer(_)
      }
    )
  }
}

const timer = new Timer()

export default timer
