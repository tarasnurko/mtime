import React, { ChangeEvent } from 'react'

import { styled } from '@mui/material'

const DateLabel = styled('label')({
  width: '100%',
  fontSize: '0.75rem',
  fontWeight: 400,
  display: 'block',
  color: '#B0BEC5',
  border: '1px solid #ECEFF1',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.5rem',
  userSelect: 'none',
})

const DateInput = styled('input')(({ theme }) => ({
  width: '100%',
  display: 'block',
  borderRadius: '0.25rem',
  border: '1px solid transparent',
  lineHeight: '1rem',
  padding: 0,
  fontSize: '1rem',
  color: theme.palette.text.primary,
  marginTop: '0.5rem',
  position: 'relative',
  overflow: 'visible',
  userSelect: 'none',
  backgroundColor: 'transparent',

  '&:focus': {
    outline: 'none',
    userSelect: 'none',
  },
  '&::-webkit-calendar-picker-indicator': {
    background: 'transparent',
    color: 'transparent',
    cursor: 'pointer',
    width: '262px',
    height: '66px',
    position: 'absolute',
    top: '-36px',
    left: '-37px',
    userSelect: 'none',
  },
}))

interface IProps {
  value: string
  onChange: (value: string) => void
}

const Component: React.FC<IProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <DateLabel htmlFor="date-input">
      Pick date
      <DateInput
        type="date"
        id="date-input"
        value={value}
        onChange={handleChange}
      />
    </DateLabel>
  )
}

export default Component
