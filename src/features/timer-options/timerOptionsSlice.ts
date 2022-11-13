import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { TIMER_MODE } from './constants'

interface TimerOptionsState {
  mode: TIMER_MODE
  workTime: number
  restTime: number
  workDefaultTime: number
  restDefaultTime: number
}

const initialState: TimerOptionsState = {
  mode: TIMER_MODE.WORK,
  workTime: 25,
  restTime: 5,
  workDefaultTime: 25,
  restDefaultTime: 5,
}

export const timerOptionsSlice = createSlice({
  name: 'timerOptions',
  initialState,
  reducers: {
    changeMode: state => {
      state.mode =
        state.mode === TIMER_MODE.WORK ? TIMER_MODE.WORK : TIMER_MODE.REST
    },
    setWorkTime: (state, action: PayloadAction<number>) => {
      state.workTime = action.payload
    },
    setRestTime: (state, action: PayloadAction<number>) => {
      state.restTime = action.payload
    },
    setWorkDefaultTime: (state, action: PayloadAction<number>) => {
      state.workDefaultTime = action.payload
    },
    setRestDefaultTime: (state, action: PayloadAction<number>) => {
      state.restDefaultTime = action.payload
    },
  },
})

export const {
  changeMode,
  setWorkTime,
  setRestTime,
  setWorkDefaultTime,
  setRestDefaultTime,
} = timerOptionsSlice.actions

export const selectTimerOptions = (state: RootState) => state.timerOptions

export default timerOptionsSlice.reducer
