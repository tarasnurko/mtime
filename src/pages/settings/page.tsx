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
  const theme = useTheme()

  const handleWorkTime = () => {}

  const handleRestTime = () => {}

  return (
    <PageContainer>
      <FormContainer>
        <FormControlLabel control={<Switch />} label="Dark Mode" />
        <SliderContainer>
          <Typography id="default-work-time" gutterBottom variant="body2">
            Set Default Work Time
          </Typography>
          <WorkTimeSlider
            ariaLabelledBy="default-work-time"
            value={5}
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
            value={5}
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
