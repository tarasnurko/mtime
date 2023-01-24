import React from 'react'
import { Button, Container, Box, styled, useTheme } from '@mui/material'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

import { useGetTime } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectTimer,
  setTimerStatus,
  setStartTime,
  TIMER_MODE,
  TIMER_STATUS,
} from '../../features/timer'
import Typography from '@mui/material/Typography/Typography'

const Wrapper = styled(Container)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: 'text.primary';
`

const ButtonWrapper = styled(Box)`
  margin-top: -15px;
`

const TimerInnerWrapper = styled(Box)`
  margin-top: -15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: 'text.primary';
`

const Component: React.FC = () => {
  const [minutes, seconds, miliseconds] = useGetTime()

  const theme = useTheme()

  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()

  const handleStartTimer = () => {
    if (timer.mode === TIMER_MODE.WORK) {
      window.timerApi.startTimer(timer.workTime * 60 * 1000)
    } else if (timer.mode === TIMER_MODE.REST) {
      window.timerApi.startTimer(timer.restTime * 60 * 1000)
    }
    dispatch(setTimerStatus(TIMER_STATUS.PROCESS))
    dispatch(setStartTime(Date.now()))
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

  const strokeColor =
    timer.mode === TIMER_MODE.WORK && theme.palette.mode === 'light'
      ? theme.palette.primary.light
      : timer.mode === TIMER_MODE.REST && theme.palette.mode === 'light'
      ? theme.palette.secondary.light
      : timer.mode === TIMER_MODE.WORK && theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.secondary.dark

  return (
    <Wrapper>
      <CircularProgressbarWithChildren
        value={getPercentValue()}
        strokeWidth={8}
        styles={{
          root: { width: '200px' },
          trail: { stroke: theme.palette.grey[300] },
          path: {
            stroke: strokeColor,
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
              <Box
                sx={{
                  display: 'flex',
                  gap: '5px',
                  color: 'text.primary',
                  fontSize: '28px',
                }}
              >
                <Typography sx={{ fontSize: '28px' }}>{minutes}</Typography>
                <Typography sx={{ fontSize: '28px' }}>:</Typography>
                <Typography sx={{ fontSize: '28px' }}>{seconds}</Typography>
              </Box>
            </TimerInnerWrapper>
          ) : (
            <TimerInnerWrapper>
              <Box
                sx={{
                  display: 'flex',
                  gap: '5px',
                  color: 'text.primary',
                  fontSize: '28px',
                }}
              >
                <Typography sx={{ fontSize: '28px' }}>{minutes}</Typography>
                <Typography sx={{ fontSize: '28px' }}>:</Typography>
                <Typography sx={{ fontSize: '28px' }}>{seconds}</Typography>
              </Box>
              <Typography sx={{ fontSize: '24px', color: 'text.primary' }}>
                Paused
              </Typography>
            </TimerInnerWrapper>
          )}
        </React.Fragment>
      </CircularProgressbarWithChildren>
    </Wrapper>
  )
}

export default Component
