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
    value: 25,
    label: '25m',
  },
  {
    value: 45,
    label: '45m',
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

const Components: React.FC<IProps> = ({
  ariaLabel,
  value,
  defaultValue,
  onChange,
}) => {
  return (
    <Wrapper>
      <Slider
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        getAriaValueText={valuetext}
        step={5}
        marks={marks}
        min={5}
        max={80}
        valueLabelDisplay="on"
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  )
}

export default Components
