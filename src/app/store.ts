import { configureStore } from '@reduxjs/toolkit'
import timerReducer from '../features/timer/timerSlice'
import timerOptionsReducer from '../features/timer-options/timerOptionsSlice'

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    timerOptions: timerOptionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
