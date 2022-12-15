import React from 'react'
import { Outlet } from 'react-router-dom'

import { useTimerEnd } from '../../hooks'

const Component: React.FC = () => {
  useTimerEnd()
  return <Outlet />
}

export default Component
