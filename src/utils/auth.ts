export type StudentRecord = {
  email: string
  classes: string[]
  lunch: string
  photoBase64?: string
}

export type AdminNotification = {
  id: string
  date: string         // human-readable display date
  title: string
  body: string
  type: 'alert' | 'info'
  target: string       // 'all' or specific class name
  sentAt: number       // Unix ms timestamp for sorting
}

// ── Admin notifications ──────────────────────────────────────────
export function getAdminNotifications(): AdminNotification[] {
  try {
    return JSON.parse(localStorage.getItem('adminNotifications') ?? '[]')
  } catch {
    return []
  }
}

export function saveAdminNotification(n: AdminNotification): void {
  const existing = getAdminNotifications()
  localStorage.setItem('adminNotifications', JSON.stringify([n, ...existing]))
}

// ── Session helpers ──────────────────────────────────────────────
export function getStudentEmail(): string | null {
  return localStorage.getItem('studentEmail')
}

export function getAdminEmail(): string | null {
  return localStorage.getItem('adminEmail')
}

export function getUserRole(): string | null {
  return localStorage.getItem('userRole')
}

export function isLoggedIn(): boolean {
  return !!(getStudentEmail() || getAdminEmail())
}

export function isAdmin(): boolean {
  return getUserRole() === 'admin'
}

/** Clear session tokens — keeps studentData (the "database") intact */
export function clearSession(): void {
  localStorage.removeItem('studentEmail')
  localStorage.removeItem('adminEmail')
  localStorage.removeItem('userRole')
}

// ── Student data (admin-managed) ─────────────────────────────────
export function getStudentData(): StudentRecord[] {
  try {
    return JSON.parse(localStorage.getItem('studentData') || '[]')
  } catch {
    return []
  }
}

export function saveStudentData(data: StudentRecord[]): void {
  localStorage.setItem('studentData', JSON.stringify(data))
}

export function getStudentRecord(email: string): StudentRecord | undefined {
  return getStudentData().find(s => s.email.toLowerCase() === email.toLowerCase())
}

export function updateStudentPhoto(email: string, photoBase64: string): void {
  const data = getStudentData()
  const idx = data.findIndex(s => s.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) return
  data[idx] = { ...data[idx], photoBase64 }
  saveStudentData(data)
}

export function deleteStudentPhoto(email: string): void {
  const data = getStudentData()
  const idx = data.findIndex(s => s.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) return
  const { photoBase64: _removed, ...rest } = data[idx]
  data[idx] = rest as StudentRecord
  saveStudentData(data)
}
