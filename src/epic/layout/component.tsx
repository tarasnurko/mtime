import React from 'react'

import { Container } from '@mui/material'
import { Navigation } from '../navigation'
import { Base } from '../base'

const Component = () => {
  return (
    <Container
      sx={{
        width: '100%',
        height: 'calc(100vh - 56px)',
        margin: 0,
        padding: 0,
        bgcolor: 'background.default',
      }}
    >
      <Base />
      <Navigation />
    </Container>
  )
}

export default Component
