import { Routes, Route } from 'react-router-dom'
import { TimerPage } from './pages/timer'
import { SettingsPage } from './pages/settings'
import { Layout } from './epic/layout'
import { HistoryPage } from './pages/history'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TimerPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
