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
    value: 20,
    label: '20m',
  },
  {
    value: 40,
    label: '40m',
  },
  {
    value: 60,
    label: '60m',
  },
  {
    value: 80,
    label: '80m',
  },
]

const valuetext = (value: number) => `${value}m`

const Components: React.FC<IProps> = ({ ariaLabel, value, onChange }) => {
  return (
    <Wrapper>
      <Slider
        aria-label={ariaLabel}
        getAriaValueText={valuetext}
        step={5}
        marks={marks}
        min={5}
        max={80}
        value={value}
        valueLabelDisplay="on"
        onChange={onChange}
      />
    </Wrapper>
  )
}

export default Components
