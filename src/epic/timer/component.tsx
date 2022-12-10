import React from 'react'
import { Button, Container, Box, styled, useTheme } from '@mui/material'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

import { useGetTime, useTimerEnd } from '../../hooks'
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

const ButtonWrapper = styled(Box)`
  margin-top: -15px;
`

const TimerInnerWrapper = styled(Box)`
  margin-top: -15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TimeWrapper = styled(Box)`
  display: flex;
  gap: 5px;
  font-size: 28px;
  font-weight: 600;
`

const TimeText = styled('span')`
  font-size: 22px;
  font-weight: 500;
`

const Component: React.FC = () => {
  const [minutes, seconds, miliseconds] = useGetTime()
  useTimerEnd()

  const theme = useTheme()

  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()

  console.log(timer)

  const handleStartTimer = () => {
    if (timer.mode === TIMER_MODE.WORK && timer.workTime) {
      dispatch(setTimerStatus(TIMER_STATUS.PROCESS))
      window.timerApi.startTimer(timer.workTime * 60 * 1000)
    } else if (timer.mode === TIMER_MODE.REST && timer.restTime) {
      dispatch(setTimerStatus(TIMER_STATUS.PROCESS))
      window.timerApi.startTimer(timer.restTime * 60 * 1000)
    }
  }

  const transfromToPercentages = (
    miliseconds: number,
    divider: number
  ): number => {
    return Math.floor((miliseconds * 100) / (divider * 1000 * 60))
  }

  const getPercentValue = (): number => {
    if (
      (timer.status === TIMER_STATUS.PROCESS ||
        timer.status === TIMER_STATUS.PAUSE) &&
      timer.mode === TIMER_MODE.WORK &&
      timer.workTime
    ) {
      return transfromToPercentages(miliseconds, timer.workTime)
    } else if (
      (timer.status === TIMER_STATUS.PROCESS ||
        timer.status === TIMER_STATUS.PAUSE) &&
      timer.mode === TIMER_MODE.REST &&
      timer.restTime
    ) {
      return transfromToPercentages(miliseconds, timer.restTime)
    }

    return 100
  }

  console.log(`${minutes} : ${seconds}`)

  return (
    <Wrapper>
      <CircularProgressbarWithChildren
        value={getPercentValue()}
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
            <ButtonWrapper>
              <Button variant="text" size="large" onClick={handleStartTimer}>
                Start
              </Button>
            </ButtonWrapper>
          ) : timer.status === TIMER_STATUS.PROCESS ? (
            <TimerInnerWrapper>
              <TimeWrapper>
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
              </TimeWrapper>
            </TimerInnerWrapper>
          ) : (
            <TimerInnerWrapper>
              <TimeWrapper>
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
              </TimeWrapper>
              <TimeText>Paused</TimeText>
            </TimerInnerWrapper>
          )}
        </React.Fragment>
      </CircularProgressbarWithChildren>
    </Wrapper>
  )
}

export default Component
