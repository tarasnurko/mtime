export interface IProps {
  ariaLabel?: string
  ariaLabelledBy?: string
  value: number
  onChange: (event: Event, value: number | number[]) => void
  width?: string
  valueLabelDisplay: 'on' | 'off' | 'auto'
}
