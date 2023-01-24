import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

import { TIMER_MODE, TIMER_STATUS } from './constants'

interface TimerState {
  status: TIMER_STATUS
  mode: TIMER_MODE
  workTime: number
  restTime: number
  startTime: number
  pauseTime: number
}

const initialState: TimerState = {
  status: TIMER_STATUS.IDLE,
  mode: TIMER_MODE.WORK,
  workTime: 0,
  restTime: 0,
  startTime: 0,
  pauseTime: 0,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimerStatus: (state, action: PayloadAction<TIMER_STATUS>) => {
      state.status = action.payload
    },
    changeTimerMode: state => {
      state.mode =
        state.mode === TIMER_MODE.WORK ? TIMER_MODE.REST : TIMER_MODE.WORK
    },
    setWorkTime: (state, action: PayloadAction<number>) => {
      state.workTime = action.payload
    },
    setRestTime: (state, action: PayloadAction<number>) => {
      state.restTime = action.payload
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload
    },
    startPause: (state, action: PayloadAction<number>) => {
      state.pauseTime = action.payload
    },
    endPause: (state, action: PayloadAction<number>) => {
      if (state.pauseTime) {
        state.startTime = state.startTime + (action.payload - state.pauseTime)
        state.pauseTime = 0
      }
    },
    resetTime: state => {
      state.startTime = 0
      state.pauseTime = 0
    },
  },
})

export const {
  setTimerStatus,
  changeTimerMode,
  setWorkTime,
  setRestTime,
  setStartTime,
  startPause,
  endPause,
  resetTime,
} = timerSlice.actions

export const selectTimer = (state: RootState) => state.timer

export default timerSlice.reducer
