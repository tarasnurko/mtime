import React from 'react'

import { Container, styled } from '@mui/material'
import { Navigation } from '../navigation'
import { Base } from '../base'

const PageContainer = styled(Container)`
  width: 100%;
  height: calc(100vh - 56px);
  margin: 0;
  padding: 20px;
`

const Component = () => {
  return (
    <PageContainer>
      <Base />
      <Navigation />
    </PageContainer>
  )
}

export default Component
