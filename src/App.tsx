import { Routes, Route } from 'react-router-dom'
import { TimerPage } from './pages/timer'

export function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TimerPage />} />
        <Route path="stats" element={<div>stats</div>} />
      </Route>
    </Routes>
  )
}
