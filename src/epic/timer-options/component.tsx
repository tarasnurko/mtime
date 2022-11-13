import {
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material'
import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectTimerOptions, TIMER_MODE } from '../../features/timer-options'
import { RestTimeSlider } from '../rest-time-slider'
import { WorkTimeSlider } from '../work-time-slider'

const Wrapper = styled(Container)`
  padding: 0;
  width: 100%;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Component: React.FC = () => {
  const [option, setOption] = useState<TIMER_MODE>(TIMER_MODE.WORK)

  const [value, setValue] = useState<number>(25)

  const timerOptions = useAppSelector(selectTimerOptions)

  const handleChange = (event: SelectChangeEvent) =>
    setOption(event.target.value as TIMER_MODE)

  const handleWorkTimeChange = (event: Event, value: number) => {
    // console.log(event.target)
    setValue(value)
  }

  return (
    <Wrapper>
      <Select
        value={option}
        size="small"
        variant="outlined"
        onChange={handleChange}
      >
        <MenuItem value={TIMER_MODE.WORK}>work</MenuItem>
        <MenuItem value={TIMER_MODE.REST}>rest</MenuItem>
      </Select>
      {option === TIMER_MODE.WORK ? (
        <WorkTimeSlider
          ariaLabel="timer-work-time"
          value={value}
          defaultValue={timerOptions.workDefaultTime}
          onChange={handleWorkTimeChange}
        />
      ) : (
        <RestTimeSlider ariaLabel="timer-rest-time" />
      )}
    </Wrapper>
  )
}

export default Component
