import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

const initialState = {
  value: false,
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const { setDarkMode } = darkModeSlice.actions

export const selectDarkMode = (state: RootState) => state.darkMode.value
export default darkModeSlice.reducer
