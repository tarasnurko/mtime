import { contextBridge } from 'electron'
import { timerApi } from './timer'

contextBridge.exposeInMainWorld('timerApi', timerApi)
