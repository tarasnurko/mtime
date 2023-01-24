import React from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import {
  changeTimerMode,
  setRestTime,
  setWorkTime,
  TIMER_MODE,
  selectTimer,
} from '../../features/timer'

import {
  Container,
  Box,
  MenuItem,
  Select,
  Typography,
  styled,
  useTheme,
} from '@mui/material'

import { RestTimeSlider } from '../rest-time-slider'
import { WorkTimeSlider } from '../work-time-slider'

const Wrapper = styled(Container)`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SelectWrapper = styled(Box)`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`

const Component: React.FC = () => {
  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()
  const theme = useTheme()

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

  return (
    <Wrapper theme={theme}>
      <SelectWrapper>
        <Select
          value={timer.mode}
          size="small"
          variant="outlined"
          onChange={handleChange}
        >
          <MenuItem value={TIMER_MODE.WORK}>work</MenuItem>
          <MenuItem value={TIMER_MODE.REST}>rest</MenuItem>
        </Select>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          {timer.mode === TIMER_MODE.WORK ? timer.workTime : timer.restTime}m
        </Typography>
      </SelectWrapper>
      {timer.mode === TIMER_MODE.WORK ? (
        <WorkTimeSlider
          ariaLabel="timer-work-time"
          value={timer.workTime}
          onChange={handleWorkTimeChange}
          width="100%"
          valueLabelDisplay="auto"
        />
      ) : (
        <RestTimeSlider
          ariaLabel="timer-rest-time"
          value={timer.restTime}
          onChange={handleRestTimeChange}
          width="100%"
          valueLabelDisplay="auto"
        />
      )}
    </Wrapper>
  )
}

export default Component
