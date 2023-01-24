import { Box, Slider, styled } from '@mui/material'
import React from 'react'
import { IProps } from './constatns'

const Wrapper = styled(Box)`
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

const Components: React.FC<IProps> = ({
  ariaLabel,
  ariaLabelledBy,
  value,
  onChange,
  width,
  valueLabelDisplay,
}) => {
  return (
    <Wrapper width={width}>
      <Slider
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        getAriaValueText={valuetext}
        step={5}
        marks={marks}
        min={5}
        max={40}
        value={value}
        valueLabelDisplay={valueLabelDisplay}
        onChange={onChange}
      />
    </Wrapper>
  )
}

export default Components
