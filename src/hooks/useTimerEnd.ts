import { useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { setTimerStatus, TIMER_STATUS } from '../features/timer'

const useTimerEnd = (): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const removeEventListener = window.timerApi.getTimerEnd(() => {
      dispatch(setTimerStatus(TIMER_STATUS.IDLE))
      console.log('timer-end')
    })
  }, [])
}

export default useTimerEnd
