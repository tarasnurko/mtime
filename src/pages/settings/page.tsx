import React from 'react'

import { Container, styled } from '@mui/material'

import { Settings } from '../../epic/settings'

const Wrapper = styled(Container)`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
`

const Page: React.FC = () => {
  return (
    <Wrapper>
      <Settings />
    </Wrapper>
  )
}

export default Page
