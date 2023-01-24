import { BrowserWindow, ipcMain, Notification } from 'electron'

import { timerEndNotificationMessages, NOTIFICATION_EVENTS } from './'

const emitShowTimerEndNotification = () => {
  const randomMessage =
    timerEndNotificationMessages[
      Math.floor(Math.random() * timerEndNotificationMessages.length)
    ]

  const notification = new Notification({
    title: 'mtime',
    body: randomMessage,
  })

  notification.show()

  notification.on('click', () => {
    ipcMain.emit(NOTIFICATION_EVENTS.SHOW_MAIN_WINDOW)
  })

  // doesn't save in notifications list
  notification.on('close', () => {
    notification.close()
  })
}

const onShowTimerEndNotification = (browserWindow: BrowserWindow | null) => {
  ipcMain.on(NOTIFICATION_EVENTS.SHOW_MAIN_WINDOW, async () => {
    browserWindow?.show()
  })
}

export { emitShowTimerEndNotification, onShowTimerEndNotification }
