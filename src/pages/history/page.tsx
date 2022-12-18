import React from 'react'
import { Container, styled } from '@mui/material'

import { HistoryTable } from '../../epic/history-table'

const Wrapper = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
`

const Page = () => {
  return (
    <Wrapper>
      <HistoryTable />
    </Wrapper>
  )
}

export default Page
