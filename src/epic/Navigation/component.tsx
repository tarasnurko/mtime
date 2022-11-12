import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import DataSaverOffOutlinedIcon from '@mui/icons-material/DataSaverOffOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const Container = styled(Paper)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const Component = () => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue)
  }

  return (
    <Container elevation={3}>
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Main"
          icon={<TimerOutlinedIcon />}
          component={Link}
          to="/"
        />

        <BottomNavigationAction
          label="Stats"
          icon={<DataSaverOffOutlinedIcon />}
          component={Link}
          to="/stats"
        />
        <BottomNavigationAction
          label="History"
          icon={<HistoryOutlinedIcon />}
          component={Link}
          to="/history"
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsOutlinedIcon />}
          component={Link}
          to="/settings"
        />
      </BottomNavigation>
    </Container>
  )
}

export default Component
