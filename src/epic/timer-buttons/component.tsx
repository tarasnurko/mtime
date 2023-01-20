import React from 'react'
import { Box, Button, styled } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectTimer,
  setTimerStatus,
  startPause,
  endPause,
  resetTime,
  TIMER_STATUS,
} from '../../features/timer'

import { useLocalStorage } from '../../hooks'

import { IHistory } from '../history-table'

const ButtonWrapper = styled(Box)`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`

const Component: React.FC = () => {
  const [history, setHistory] = useLocalStorage<IHistory>('history', [])

  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()

  const handlePause = () => {
    window.timerApi.startPause()
    dispatch(setTimerStatus(TIMER_STATUS.PAUSE))
    dispatch(startPause(Date.now()))
  }

  const handleContinue = () => {
    window.timerApi.endPause()
    dispatch(setTimerStatus(TIMER_STATUS.PROCESS))
    dispatch(endPause(Date.now()))
  }

  const handleStop = () => {
    window.timerApi.stopTimer()

    if (timer.status === TIMER_STATUS.PAUSE) {
      dispatch(endPause(Date.now()))
    }

    setHistory(prevValue => [
      {
        startTime: timer.startTime,
        endTime: Date.now(),
        mode: timer.mode,
        completed: false,
      },
      ...prevValue,
    ])

    dispatch(setTimerStatus(TIMER_STATUS.IDLE))
    dispatch(resetTime())
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
