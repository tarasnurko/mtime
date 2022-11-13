import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { TIMER_STATUS } from './constants'

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
    setTimerStatus: (state, action: PayloadAction<TIMER_STATUS>) => {
      state.status = action.payload
    },
  },
})

export const { setTimerStatus } = timerSlice.actions

export const selectTimer = (state: RootState) => state.timer.currentTime

export default timerSlice.reducer
