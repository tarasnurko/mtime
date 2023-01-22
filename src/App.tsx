import React, { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './epic/layout'

import { TimerPage } from './pages/timer'
import { StatsPage } from './pages/stats'
import { HistoryPage } from './pages/history'
import { SettingsPage } from './pages/settings'
import { createTheme, ThemeProvider } from '@mui/material'
import { useAppSelector } from './app/hooks'
import { selectDarkMode } from './features/darkMode'

export function App() {
  const darkMode = useAppSelector(selectDarkMode)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TimerPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}
