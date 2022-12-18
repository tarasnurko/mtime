import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'

import {
  selectTimer,
  setTimerStatus,
  resetTime,
  TIMER_STATUS,
} from '../features/timer'

import { useLocalStorage } from '../hooks'

import { IHistory } from '../epic/history-table'

const useTimerEnd = (): void => {
  const [history, setHistory] = useLocalStorage<IHistory>('history', [])

  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const removeEventListener = window.timerApi.getTimerEnd(() => {
      console.log('timer-end in renderer')

      setHistory(prevValue => [
        {
          startTime: timer.startTime,
          endTime: Date.now(),
          mode: timer.mode,
          completed: true,
        },
        ...prevValue,
      ])

      dispatch(setTimerStatus(TIMER_STATUS.IDLE))
      dispatch(resetTime())
    })

    return () => {
      removeEventListener()
    }
  }, [timer])
}

export default useTimerEnd
