import { Routes, Route } from 'react-router-dom'

import { Layout } from './epic/layout'

import { TimerPage } from './pages/timer'
import { StatsPage } from './pages/stats'
import { HistoryPage } from './pages/history'
import { SettingsPage } from './pages/settings'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TimerPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
