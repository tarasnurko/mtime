import React from 'react'

import { Container, styled } from '@mui/material'
import { Navigation } from '../navigation'
import { TimerOutlet } from '../timer-outler'

const PageContainer = styled(Container)`
  width: 100%;
  height: calc(100vh - 56px);
  margin: 0;
  padding: 20px;
`

const Component = () => {
  return (
    <PageContainer>
      <TimerOutlet />
      <Navigation />
    </PageContainer>
  )
}

export default Component
