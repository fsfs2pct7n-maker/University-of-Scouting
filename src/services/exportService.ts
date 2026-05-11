import { getStudentData, getAdminNotifications } from '../utils/auth'

function downloadBlob(content: string, filename: string, mime = 'text/csv'): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8;` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Download all student records as a CSV file */
export function exportStudentsCSV(): void {
  const students = getStudentData()
  const header = 'email,classes,lunch'
  const rows = students.map(s => {
    const classes = s.classes.join(',')
    const needsQuotes = classes.includes(',')
    return `${s.email},${needsQuotes ? `"${classes}"` : classes},${s.lunch ?? ''}`
  })
  downloadBlob([header, ...rows].join('\n'), 'uos-students.csv')
}

/** Download admin-sent notifications as a CSV file */
export function exportNotificationsCSV(): void {
  type AdminNotif = { date: string; title: string; body: string; type: string; target: string }
  let notifications: AdminNotif[] = []
  try {
    notifications = JSON.parse(localStorage.getItem('adminNotifications') ?? '[]')
  } catch {
    notifications = []
  }

  const header = 'date,title,message,type,target'
  const rows = notifications.map(n =>
    `"${n.date}","${n.title.replace(/"/g, '""')}","${n.body.replace(/"/g, '""')}",${n.type},${n.target}`
  )
  downloadBlob([header, ...rows].join('\n'), 'uos-notifications.csv')
}

/** Download a plain-text system summary */
export function exportSystemSummary(): void {
  const students = getStudentData()
  const notifications = getAdminNotifications()
  const exportDate = new Date().toLocaleString()

  // Unique class count
  const allClasses = new Set(students.flatMap(s => s.classes))

  // Lunch breakdown
  const lunchCounts: Record<string, number> = {}
  for (const s of students) {
    const key = s.lunch || '(not set)'
    lunchCounts[key] = (lunchCounts[key] ?? 0) + 1
  }
  const lunchLines = Object.entries(lunchCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => `  ${name}: ${count}`)
    .join('\n')

  const lines = [
    '='.repeat(44),
    '  UNIVERSITY OF SCOUTING — SYSTEM SUMMARY',
    '='.repeat(44),
    '',
    `Export Date:         ${exportDate}`,
    '',
    '── STUDENTS ────────────────────────────────',
    `Total Students:      ${students.length}`,
    `Unique Classes:      ${allClasses.size}`,
    '',
    '── LUNCH BREAKDOWN ─────────────────────────',
    lunchLines || '  (no data)',
    '',
    '── NOTIFICATIONS ───────────────────────────',
    `Admin Notifications: ${notifications.length}`,
    '',
    '='.repeat(44),
  ]

  downloadBlob(lines.join('\n'), 'uos-summary.txt', 'text/plain')
}
