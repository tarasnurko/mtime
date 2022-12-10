import { Container, styled } from '@mui/material'
import React from 'react'

import { useAppSelector } from '../../app/hooks'
import { selectTimer, TIMER_STATUS } from '../../features/timer'

import { PageContainer } from '../../common/page-container'
import { Navigation } from '../../epic/navigation'
import { Timer } from '../../epic/timer'
import { TimerButtons } from '../../epic/timer-buttons'
import { TimerOptions } from '../../epic/timer-options'

const Wrapper = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Page: React.FC = () => {
  const timer = useAppSelector(selectTimer)

  return (
    <PageContainer>
      <Wrapper>
        <Timer />
        {timer.status === TIMER_STATUS.IDLE ? (
          <TimerOptions />
        ) : (
          <TimerButtons />
        )}
      </Wrapper>
      <Navigation />
    </PageContainer>
  )
}

export default Page
