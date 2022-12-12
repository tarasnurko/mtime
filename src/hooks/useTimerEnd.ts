import { useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { setTimerStatus, TIMER_STATUS } from '../features/timer'

const useTimerEnd = (): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const removeEventListener = window.timerApi.getTimerEnd(() => {
      console.log('timer-end in renderer')

      dispatch(setTimerStatus(TIMER_STATUS.IDLE))

      window.timerApi.receiveTimerEnd()
    })

    return () => {
      removeEventListener()
    }
  }, [])
}

export default useTimerEnd
