import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export enum TIMER_STATUS {
  IDLE = 'IDLE',
  WORK = 'WORK',
  REST = 'REST',
  PAUSE = 'PAUSE',
  STOP = 'STOP',
}

// 1) We create new Date() in which we add time we need (start time is new Date(new Date() + timeWeNeed))
// 2) In react component we create setInterval which substract time until it goes to 0 (currentTime is substructedTime)

interface TimerState {
  currentTime: number
  startTime: number
  status: TIMER_STATUS
}

const initialState: TimerState = {
  currentTime: 0,
  startTime: 0,
  status: TIMER_STATUS.IDLE,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    log: state => {
      state.currentTime += 1
    },
  },
})

export const { log } = timerSlice.actions

export const selectTimer = (state: RootState) => state.timer.currentTime

export default timerSlice.reducer
