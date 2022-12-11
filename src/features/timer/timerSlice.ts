import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

import { TIMER_MODE, TIMER_STATUS } from './constants'

interface TimerState {
  status: TIMER_STATUS
  mode: TIMER_MODE
  workTime: number
  restTime: number
}

const initialState: TimerState = {
  status: TIMER_STATUS.IDLE,
  mode: TIMER_MODE.WORK,
  workTime: 0,
  restTime: 0,
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
  },
})

export const { setTimerStatus, changeTimerMode, setWorkTime, setRestTime } =
  timerSlice.actions

export const selectTimer = (state: RootState) => state.timer

export default timerSlice.reducer
