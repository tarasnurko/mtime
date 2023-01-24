import { Box } from '@mui/material'
import React from 'react'

import { useAppSelector } from '../../app/hooks'
import { selectTimer, TIMER_STATUS } from '../../features/timer'

import { Timer } from '../../epic/timer'
import { TimerButtons } from '../../epic/timer-buttons'
import { TimerOptions } from '../../epic/timer-options'

const Page: React.FC = () => {
  const timer = useAppSelector(selectTimer)

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '20px 30px 0 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Timer />
      {timer.status === TIMER_STATUS.IDLE ? <TimerOptions /> : <TimerButtons />}
    </Box>
  )
}

export default Page
