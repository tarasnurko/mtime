import timer from './timer'

export const timerApi = {
  startTimer: timer.sendStartTimer,
  startPause: timer.sendStartPause,
  endPause: timer.sendEndPause,
  stopTimer: timer.sendStopTimer,

  getTime: timer.getTime,
  getTimerEnd: timer.getTimerEnd,
}
