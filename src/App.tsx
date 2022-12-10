import { Routes, Route } from 'react-router-dom'
import { TimerPage } from './pages/timer'
import { SettingsPage } from './pages/settings'

export function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TimerPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
