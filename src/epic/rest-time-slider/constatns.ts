export interface IProps {
  ariaLabel: string
  value: number
  onChange: (event: Event, value: number | number[]) => void
}
