import React from 'react'
import { Box, Button, styled } from '@mui/material'

const ButtonWrapper = styled(Box)`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`

const Component: React.FC = () => {
  return (
    <ButtonWrapper>
      <Button variant="outlined" color="info">
        Pause
      </Button>
      <Button variant="contained" color="error">
        Stop
      </Button>
    </ButtonWrapper>
  )
}

export default Component
