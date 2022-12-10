import React from 'react'

import { Link, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

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

const Component: React.FC = () => {
  const { pathname } = useLocation()

  const getPageIndex = () => {
    if (pathname === '/') return 0
    if (pathname === '/stats') return 1
    if (pathname === 'history') return 2
    if (pathname === '/settings') return 3
  }

  return (
    <Container elevation={3}>
      <BottomNavigation showLabels value={getPageIndex()}>
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
