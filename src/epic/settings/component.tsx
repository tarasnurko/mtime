import React from 'react'

import {
  Box,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  styled,
} from '@mui/material'

import { WorkTimeSlider } from '../../epic/work-time-slider'
import { RestTimeSlider } from '../../epic/rest-time-slider'
import { useLocalStorage } from '../../hooks'
import { useAppDispatch } from '../../app/hooks'
import { setDarkMode } from '../../features/darkMode'

const FormContainer = styled(FormGroup)({
  padding: '10px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

const SliderContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const Component: React.FC = () => {
  const [darkMode, setDark] = useLocalStorage<boolean>('darkMode', false)
  const [defaultWorkTime, setDefaultWorkTime] = useLocalStorage<number>(
    'defaultWorkTime',
    25
  )
  const [defaultRestTime, setDefaultRestTime] = useLocalStorage<number>(
    'defaultRestTime',
    5
  )

  const dispatch = useAppDispatch()

  const handleDarkMode = () => {
    if (!darkMode) {
      setDark(true)
      dispatch(setDarkMode(true))
    } else {
      setDark(false)
      dispatch(setDarkMode(false))
    }
  }

  const handleWorkTime = (event: Event, value: number | number[]) => {
    if (typeof value === 'number' && defaultWorkTime !== value) {
      setDefaultWorkTime(value)
    }
  }

  const handleRestTime = (event: Event, value: number | number[]) => {
    if (typeof value === 'number' && defaultRestTime !== value) {
      setDefaultRestTime(value)
    }
  }
  return (
    <FormContainer>
      <FormControlLabel
        control={<Switch checked={darkMode} />}
        label="Dark Mode"
        onClick={handleDarkMode}
        sx={{ color: 'text.primary' }}
      />
      <SliderContainer>
        <Typography
          id="default-work-time"
          gutterBottom
          variant="body2"
          sx={{ color: 'text.primary' }}
        >
          Set Default Work Time
        </Typography>
        <WorkTimeSlider
          ariaLabelledBy="default-work-time"
          value={defaultWorkTime}
          onChange={handleWorkTime}
          width="100%"
          valueLabelDisplay="auto"
        />
      </SliderContainer>
      <SliderContainer>
        <Typography
          id="default-rest-time"
          gutterBottom
          variant="body2"
          sx={{ color: 'text.primary' }}
        >
          Set Default Rest Time
        </Typography>
        <RestTimeSlider
          ariaLabelledBy="default-rest-time"
          value={defaultRestTime}
          onChange={handleRestTime}
          width="100%"
          valueLabelDisplay="auto"
        />
      </SliderContainer>
    </FormContainer>
  )
}

export default Component
