const timerEndNotificationMessages: readonly string[] = [
  'Time is up!',
  'Timer ended!',
  'Start new timer',
  'Time has passed',
]

enum NOTIFICATION_EVENTS {
  SHOW_MAIN_WINDOW = 'show-main-window',
}

export { timerEndNotificationMessages, NOTIFICATION_EVENTS }
