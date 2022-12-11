import React from 'react'

import {
  Box,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  styled,
  useTheme,
} from '@mui/material'

import { PageContainer } from '../../common/page-container'
import { Navigation } from '../../epic/navigation'
import { WorkTimeSlider } from '../../epic/work-time-slider'
import { RestTimeSlider } from '../../epic/rest-time-slider'
import { useLocalStorage } from '../../hooks'

const FormContainer = styled(FormGroup)(props => ({
  padding: '20px 40px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}))

const SliderContainer = styled(Box)(props => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

const Page: React.FC = () => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false)
  const [defaultWorkTime, setDefaultWorkTime] = useLocalStorage<number>(
    'defaultWorkTime',
    25
  )
  const [defaultRestTime, setDefaultRestTime] = useLocalStorage<number>(
    'defaultRestTime',
    5
  )

  const theme = useTheme()

  const handleDarkMode = () => {
    if (!darkMode) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }

  const handleWorkTime = (event: Event, value: number | number[]) => {
    if (typeof value === 'number' && defaultWorkTime !== value) {
      console.log('df')
      setDefaultWorkTime(value)
    }
  }

  const handleRestTime = (event: Event, value: number | number[]) => {
    if (typeof value === 'number' && defaultRestTime !== value) {
      console.log('df')
      setDefaultRestTime(value)
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <FormControlLabel
          control={<Switch checked={darkMode} />}
          label="Dark Mode"
          onClick={handleDarkMode}
        />
        <SliderContainer>
          <Typography id="default-work-time" gutterBottom variant="body2">
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
          <Typography id="default-rest-time" gutterBottom variant="body2">
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
      <Navigation />
    </PageContainer>
  )
}

export default Page
