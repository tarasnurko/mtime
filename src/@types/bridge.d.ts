import { api } from '../../electron/bridge'
import { timerApi } from '../../electron/timer'

declare global {
  // eslint-disable-next-line
  interface Window {
    Main: typeof api
    timerApi: typeof timerApi
  }
}
