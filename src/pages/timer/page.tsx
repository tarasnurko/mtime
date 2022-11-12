import { Container, styled } from '@mui/material'
import React from 'react'
import { PageContainer } from '../../common/page-container'
import { Navigation } from '../../epic/navigation'
import { Timer } from '../../epic/timer'
import { TimerOptions } from '../../epic/timer-options'

const Wrapper = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Page: React.FC = () => {
  return (
    <PageContainer>
      <Wrapper>
        <Timer />
        <TimerOptions />
      </Wrapper>
      <Navigation />
    </PageContainer>
  )
}

export default Page
