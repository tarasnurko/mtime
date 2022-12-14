import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container, styled } from '@mui/material'
import { Navigation } from '../navigation'

const PageContainer = styled(Container)`
  width: 100%;
  height: calc(100vh - 56px);
  margin: 0;
  padding: 20px;
`

const Component = () => {
  return (
    <PageContainer>
      <Outlet />
      <Navigation />
    </PageContainer>
  )
}

export default Component
