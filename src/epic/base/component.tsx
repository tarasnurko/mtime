import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { useTimerEnd, useLocalStorage } from '../../hooks'

import { setRestTime, setWorkTime, selectTimer } from '../../features/timer'

const Component: React.FC = () => {
  const [defaultWorkTime] = useLocalStorage<number>('defaultWorkTime', 25)
  const [defaultRestTime] = useLocalStorage<number>('defaultRestTime', 5)

  useTimerEnd()

  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!timer.workTime) {
      dispatch(setWorkTime(defaultWorkTime))
    }
    if (!timer.restTime) {
      dispatch(setRestTime(defaultRestTime))
    }
  }, [])

  return <Outlet />
}

export default Component
