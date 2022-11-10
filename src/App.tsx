import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'

export function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  )
}
