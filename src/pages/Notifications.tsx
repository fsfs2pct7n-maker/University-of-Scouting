import { Bell, Info, BellOff } from 'lucide-react'
import { getAdminNotifications, getStudentRecord, isAdmin, getStudentEmail } from '../utils/auth'

type NotifItem = {
  date: string
  title: string
  body: string
  type: 'alert' | 'info'
  target?: string
  sentAt?: number
}

const HARDCODED: NotifItem[] = [
  {
    date: '12/6/2025 3:34:43 PM',
    title: 'Campus Tours 4:15',
    body: 'Meet at Class of 1950 by 4:15 PM for campus tour for those that registered.',
    type: 'alert',
    sentAt: new Date('12/6/2025 3:34:43 PM').getTime(),
  },
  {
    date: '12/6/2025 6:01:38 AM',
    title: 'Animal Science Badge CANCELLED',
    body: 'The instructor for the animal science merit badge is sick and unable to teach the badge today. Please report to the Armory Room 102 and work with Elizabeth in the morning to find an alternate class for your morning session. Thank you and we apologize for any inconvenience!',
    type: 'alert',
    sentAt: new Date('12/6/2025 6:01:38 AM').getTime(),
  },
  {
    date: '12/6/2025 5:56:52 AM',
    title: 'Nature Badge CANCELLED',
    body: 'The instructor for the nature merit badge is sick and unable to teach the badge today. Please report to the Armory Room 102 and work with Elizabeth in the morning to find an alternate class for your afternoon session. Thank you and we apologize for any inconvenience!',
    type: 'alert',
    sentAt: new Date('12/6/2025 5:56:52 AM').getTime(),
  },
  {
    date: '11/19/2025 3:11:40 PM',
    title: 'Registration Closed App Refresh',
    body: 'Hello everyone! With the close of registration, a final update of users to the app and updated schedules was just pushed out. Please refresh your app to see your updated schedule. If you have any issues, please contact us. Thank you for registering and we look forward to seeing you at University of Scouting!',
    type: 'info',
    sentAt: new Date('11/19/2025 3:11:40 PM').getTime(),
  },
  {
    date: '7/11/2025 8:00:04 AM',
    title: '2025 App Refresh Work in Progress',
    body: 'Hello all! This is the developer of the app. I am currently working on refreshing the app for 2025. Please be patient as I work through the updates. Thank you for your continued support of University of Scouting!',
    type: 'info',
    sentAt: new Date('7/11/2025 8:00:04 AM').getTime(),
  },
]

export default function Notifications() {
  const studentEmail = getStudentEmail()
  const myClasses = studentEmail ? (getStudentRecord(studentEmail)?.classes ?? []) : []
  const viewingAsAdmin = isAdmin()

  const raw = getAdminNotifications()
  const filtered = viewingAsAdmin
    ? raw
    : raw.filter(n => n.target === 'all' || myClasses.includes(n.target))

  const adminNotifs: NotifItem[] = filtered.map(n => ({
    date: n.date,
    title: n.title,
    body: n.body + (viewingAsAdmin && n.target && n.target !== 'all' ? ` [For: ${n.target}]` : ''),
    type: n.type,
    target: n.target,
    sentAt: n.sentAt,
  }))

  // Merge and sort newest first
  const all = [...adminNotifs, ...HARDCODED].sort((a, b) => (b.sentAt ?? 0) - (a.sentAt ?? 0))

  if (all.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '320px', padding: '40px 24px', textAlign: 'center' }}>
        <div className="empty-tile">
          <BellOff size={32} color="var(--color-primary-dark)" strokeWidth={1.7} />
        </div>
        <p style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '8px' }}>
          No notifications yet
        </p>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '300px', lineHeight: 1.55 }}>
          You'll see updates here about your classes, schedule changes, and event announcements.
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '14px',
          paddingLeft: '2px',
        }}
      >
        Sent Messages · {all.length} total
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {all.map((n, i) => (
          <div
            key={i}
            style={{
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #f0ece5',
              borderLeft: `4px solid ${n.type === 'alert' ? '#cfb991' : '#b0b8c5'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: n.type === 'alert' ? '#f7f2eb' : '#f2f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                {n.type === 'alert' ? (
                  <Bell size={16} color="#cfb991" fill="#cfb991" />
                ) : (
                  <Info size={16} color="#8a99aa" />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '11px', color: 'var(--gray)', marginBottom: '4px' }}>
                  {n.date}
                </p>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '6px',
                    lineHeight: 1.3,
                  }}
                >
                  {n.title}
                </p>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.55 }}>{n.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
