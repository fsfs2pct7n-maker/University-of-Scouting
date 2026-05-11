// ── Browser Notification API wrapper ────────────────────────────

export function isSupported(): boolean {
  return 'Notification' in window
}

export function getPermission(): NotificationPermission {
  if (!isSupported()) return 'denied'
  return Notification.permission
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (!isSupported()) return 'denied'
  if (Notification.permission === 'granted') return 'granted'
  return Notification.requestPermission()
}

export function sendNotification(title: string, body: string, tag?: string): boolean {
  if (!isSupported() || Notification.permission !== 'granted') return false
  new Notification(title, {
    body,
    icon: '/seal.png',
    tag: tag ?? 'uos-notification',
    badge: '/seal.png',
  })
  return true
}

export function scheduleNotification(
  title: string,
  body: string,
  delayMs: number,
  tag?: string,
): ReturnType<typeof setTimeout> {
  return setTimeout(() => sendNotification(title, body, tag), delayMs)
}

// ── localStorage preference ──────────────────────────────────────
export function getNotificationPref(): boolean {
  return localStorage.getItem('notificationsEnabled') === 'true'
}

export function setNotificationPref(enabled: boolean): void {
  localStorage.setItem('notificationsEnabled', String(enabled))
}
