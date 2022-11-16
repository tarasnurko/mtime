import React, { useState, useEffect } from 'react'
import { Button, Container, Box, styled, useTheme } from '@mui/material'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectTimer,
  setTimerStatus,
  TIMER_MODE,
  TIMER_STATUS,
} from '../../features/timer'

const Wrapper = styled(Container)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TimeWrapper = styled(Box)`
  margin-top: -15px;
  display: flex;
  gap: 5px;
  font-size: 28px;
  font-weight: 600;
`

const Component: React.FC = () => {
  const [seconds, setSeconds] = useState<string>('')
  const [minutes, setMinutes] = useState<string>('')

  const theme = useTheme()

  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()

  const getSeconds = (miliseconds: number): string => {
    const time = Math.floor((miliseconds / 1000) % 60)
    return time > 9 ? time.toString() : `0${time}`
  }

  const getMinutes = (miliseconds: number): string => {
    const time = Math.floor(miliseconds / 1000 / 60)
    return time > 9 ? time.toString() : `0${time}`
  }

  const handleStartTimer = () => {
    if (timer.mode === TIMER_MODE.WORK && timer.workTime) {
      dispatch(setTimerStatus(TIMER_STATUS.PROCESS))
      window.timerApi.startTimer(timer.workTime * 60 * 1000)
    } else if (timer.mode === TIMER_MODE.REST && timer.restTime) {
      dispatch(setTimerStatus(TIMER_STATUS.PROCESS))
      window.timerApi.startTimer(timer.restTime * 60 * 1000)
    }
  }

  useEffect(() => {
    window.timerApi.getTime((data: number) => {
      setSeconds(getSeconds(data))
      setMinutes(getMinutes(data))
    })
  }, [])

  return (
    <Wrapper>
      <CircularProgressbarWithChildren
        value={18}
        strokeWidth={8}
        styles={{
          root: { width: '200px' },
          trail: { stroke: theme.palette.grey[300] },
          path: {
            stroke:
              timer.mode === TIMER_MODE.WORK
                ? theme.palette.primary.light
                : theme.palette.secondary.light,
          },
        }}
      >
        <React.Fragment>
          {timer.status === TIMER_STATUS.IDLE ? (
            <Button variant="text" size="large" onClick={handleStartTimer}>
              Start
            </Button>
          ) : timer.status === TIMER_STATUS.PROCESS ? (
            <TimeWrapper>
              <span>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
            </TimeWrapper>
          ) : (
            <div>df</div>
          )}
        </React.Fragment>
      </CircularProgressbarWithChildren>
    </Wrapper>
  )
}

export default Component
