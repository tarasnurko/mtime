import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import {
  changeTimerMode,
  setRestTime,
  setWorkTime,
  TIMER_MODE,
  selectTimer,
} from '../../features/timer'
import { useLocalStorage } from '../../hooks'

import { RestTimeSlider } from '../rest-time-slider'
import { WorkTimeSlider } from '../work-time-slider'

import { Container, MenuItem, Select, styled } from '@mui/material'

const Wrapper = styled(Container)`
  padding: 0;
  width: 100%;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Component: React.FC = () => {
  const [defaultWorkTime] = useLocalStorage<number>('defaultWorkTime', 25)
  const [defaultRestTime] = useLocalStorage<number>('defaultRestTime', 5)

  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()

  const handleChange = () => {
    dispatch(changeTimerMode())
  }

  const handleWorkTimeChange = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      dispatch(setWorkTime(value))
    }
  }

  const handleRestTimeChange = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      dispatch(setRestTime(value))
    }
  }

  useEffect(() => {
    if (!timer.workTime) {
      dispatch(setWorkTime(defaultWorkTime))
    }
    if (!timer.restTime) {
      dispatch(setRestTime(defaultRestTime))
    }
  }, [])

  console.log(timer)

  return (
    <Wrapper>
      <Select
        value={timer.mode}
        size="small"
        variant="outlined"
        onChange={handleChange}
      >
        <MenuItem value={TIMER_MODE.WORK}>work</MenuItem>
        <MenuItem value={TIMER_MODE.REST}>rest</MenuItem>
      </Select>
      {timer.mode === TIMER_MODE.WORK ? (
        <WorkTimeSlider
          ariaLabel="timer-work-time"
          value={timer.workTime}
          onChange={handleWorkTimeChange}
          width="180px"
          valueLabelDisplay="on"
        />
      ) : (
        <RestTimeSlider
          ariaLabel="timer-rest-time"
          value={timer.restTime}
          onChange={handleRestTimeChange}
          width="180px"
          valueLabelDisplay="on"
        />
      )}
    </Wrapper>
  )
}

export default Component
