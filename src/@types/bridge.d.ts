import { timerApi } from '../../electron/timer'

declare global {
  // eslint-disable-next-line
  interface Window {
    timerApi: typeof timerApi
  }
}
