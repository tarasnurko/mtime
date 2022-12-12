import { Notification } from 'electron'

class Notifications {
  private notification: Notification | null

  constructor() {
    this.notification = null
  }
}

const notifications = new Notifications()

export default notifications
