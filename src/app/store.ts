import { configureStore } from '@reduxjs/toolkit'
import timerReducer from '../features/timer/timerSlice'
import darkModeReducer from '../features/darkMode/darkModeSlice'

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    darkMode: darkModeReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
