import React from 'react'
import { Box, Button, styled } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectTimer, setTimerStatus, TIMER_STATUS } from '../../features/timer'

const ButtonWrapper = styled(Box)`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`

const Component: React.FC = () => {
  const dispatch = useAppDispatch()

  const timer = useAppSelector(selectTimer)

  const handlePause = () => {
    dispatch(setTimerStatus(TIMER_STATUS.PAUSE))
    window.timerApi.startPause()
  }

  const handleContinue = () => {
    dispatch(setTimerStatus(TIMER_STATUS.PROCESS))
    window.timerApi.endPause()
  }

  const handleStop = () => {
    dispatch(setTimerStatus(TIMER_STATUS.IDLE))
    window.timerApi.stopTimer()
  }

  return (
    <ButtonWrapper>
      {timer.status === TIMER_STATUS.PROCESS ? (
        <Button variant="outlined" color="info" onClick={handlePause}>
          Pause
        </Button>
      ) : (
        <Button variant="outlined" color="info" onClick={handleContinue}>
          Continue
        </Button>
      )}
      <Button variant="contained" color="error" onClick={handleStop}>
        Stop
      </Button>
    </ButtonWrapper>
  )
}

export default Component
