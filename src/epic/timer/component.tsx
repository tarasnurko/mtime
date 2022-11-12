import { Button, Container, styled, useTheme } from '@mui/material'
import React from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

const Wrapper = styled(Container)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Component: React.FC = () => {
  const theme = useTheme()

  return (
    <Wrapper>
      <CircularProgressbarWithChildren
        value={18}
        strokeWidth={8}
        styles={{
          root: { width: '200px' },
          trail: { stroke: theme.palette.grey[300] },
          path: { stroke: theme.palette.primary.light },
        }}
      >
        <Button variant="text" size="large">
          Start
        </Button>
      </CircularProgressbarWithChildren>
    </Wrapper>
  )
}

export default Component
