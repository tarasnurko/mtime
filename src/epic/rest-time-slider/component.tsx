import { Box, Slider, styled } from '@mui/material'
import React from 'react'
import { IProps } from './constatns'

const Wrapper = styled(Box)`
  width: 180px;
  display: flex;
  align-items: center;
`

const marks = [
  {
    value: 5,
    label: '5m',
  },
  {
    value: 15,
    label: '15m',
  },
  {
    value: 25,
    label: '25m',
  },
  {
    value: 40,
    label: '40m',
  },
]

const valuetext = (value: number) => `${value}m`

const Components: React.FC<IProps> = ({ ariaLabel }) => {
  return (
    <Wrapper>
      <Slider
        aria-label={ariaLabel}
        defaultValue={5}
        getAriaValueText={valuetext}
        step={5}
        marks={marks}
        min={5}
        max={40}
        valueLabelDisplay="on"
      />
    </Wrapper>
  )
}

export default Components
