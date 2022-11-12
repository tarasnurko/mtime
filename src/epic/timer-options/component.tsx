import {
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material'
import React, { useState } from 'react'
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
  const [option, setOption] = useState('work')

  const handleChange = (event: SelectChangeEvent) =>
    setOption(event.target.value)

  return (
    <Wrapper>
      <Select
        value={option}
        size="small"
        variant="outlined"
        onChange={handleChange}
      >
        <MenuItem value="work">work</MenuItem>
        <MenuItem value="rest">rest</MenuItem>
      </Select>
      {option === 'work' ? (
        <WorkTimeSlider ariaLabel="timer-work-time" />
      ) : (
        <RestTimeSlider ariaLabel="timer-rest-time" />
      )}
    </Wrapper>
  )
}

export default Component
