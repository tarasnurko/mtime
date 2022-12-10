export enum TIMER_STATUS {
  PROCESS = 'PROCESS',
  PAUSE = 'PAUSE',
  IDLE = 'IDLE',
}

export enum TIMER_EVENTS {
  START_TIMER = 'start-timer',
  GET_TIME = 'get-time',
  START_PAUSE = 'start-pause',
  END_PAUSE = 'end-pause',
  STOP_TIMER = 'stop-timer',
  END_TIMER = 'end-timer',
}
