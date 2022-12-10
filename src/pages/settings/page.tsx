import { Container, styled } from '@mui/material'
import React from 'react'
import { PageContainer } from '../../common/page-container'
import { Navigation } from '../../epic/navigation'

const Wrapper = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: red;
`

const Page = () => {
  return (
    <PageContainer>
      <Wrapper></Wrapper>
      <Navigation />
    </PageContainer>
  )
}

export default Page
