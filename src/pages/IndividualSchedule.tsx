import { useState, useRef } from 'react'
import { ChevronUp, ChevronDown, Bell, BellOff, Camera, Trash2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getStudentRecord, updateStudentPhoto, deleteStudentPhoto } from '../utils/auth'
import { BADGES, type Badge } from '../data/badges'
import {
  isSupported as notifSupported,
  getPermission,
  requestPermission,
  getNotificationPref,
  setNotificationPref,
} from '../services/notificationService'

type SortKey = keyof Badge
type SortDir = 'asc' | 'desc'

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Class Name' },
  { key: 'time', label: 'Start Time' },
  { key: 'room', label: 'Room' },
  { key: 'instructor', label: 'Instructor' },
]

export default function IndividualSchedule() {
  const { studentEmail } = useAuth()
  const [sortKey, setSortKey] = useState<SortKey>('time')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [notifEnabled, setNotifEnabled] = useState(() => getNotificationPref())
  const notifPermission = getPermission()
  const [photoSrc, setPhotoSrc] = useState<string | undefined>(
    () => (studentEmail ? getStudentRecord(studentEmail)?.photoBase64 : undefined)
  )
  const [photoHover, setPhotoHover] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handlePhotoClick() {
    fileInputRef.current?.click()
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !studentEmail) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo must be under 2 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = ev => {
      const base64 = ev.target?.result as string
      updateStudentPhoto(studentEmail, base64)
      setPhotoSrc(base64)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  function handlePhotoDelete() {
    if (!studentEmail) return
    deleteStudentPhoto(studentEmail)
    setPhotoSrc(undefined)
  }

  async function handleToggleNotifications() {
    if (notifEnabled) {
      setNotificationPref(false)
      setNotifEnabled(false)
      return
    }
    const perm = await requestPermission()
    if (perm === 'granted') {
      setNotificationPref(true)
      setNotifEnabled(true)
    }
  }

  // Find this student's registered classes
  const record = studentEmail ? getStudentRecord(studentEmail) : undefined
  const registeredNames = record?.classes ?? []
  const myClasses = BADGES.filter(b => registeredNames.includes(b.name))

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...myClasses].sort((a, b) => {
    const av = a[sortKey].toLowerCase()
    const bv = b[sortKey].toLowerCase()
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const NotifBanner = notifSupported() && notifPermission !== 'denied' && (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 14px',
      backgroundColor: notifEnabled ? '#f0fdf4' : '#f7f2eb',
      border: `1px solid ${notifEnabled ? '#86efac' : '#e8dcc5'}`,
      borderRadius: '8px',
      margin: '12px',
    }}>
      {notifEnabled ? <Bell size={16} color="#16a34a" /> : <BellOff size={16} color="#cfb991" />}
      <p style={{ flex: 1, fontSize: '13px', color: '#555' }}>
        {notifEnabled
          ? 'Class notifications are enabled.'
          : 'Get notified about class changes and announcements.'}
      </p>
      <button
        onClick={handleToggleNotifications}
        style={{
          padding: '5px 12px',
          fontSize: '12px',
          fontWeight: 600,
          backgroundColor: notifEnabled ? 'transparent' : '#cfb991',
          color: notifEnabled ? '#888' : '#fff',
          border: notifEnabled ? '1px solid #e0d9cf' : 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        {notifEnabled ? 'Disable' : 'Enable'}
      </button>
    </div>
  )

  const PhotoSection = studentEmail && (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px 8px' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePhotoChange}
      />
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          onClick={handlePhotoClick}
          onMouseEnter={() => setPhotoHover(true)}
          onMouseLeave={() => setPhotoHover(false)}
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #cfb991',
            backgroundColor: '#f7f2eb',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {photoSrc ? (
            <img src={photoSrc} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Camera size={28} color="#cfb991" />
          )}
          {photoHover && (
            <div style={{
              position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
            }}>
              <Camera size={22} color="#fff" />
            </div>
          )}
        </div>
        {photoSrc && (
          <button
            onClick={handlePhotoDelete}
            title="Remove photo"
            style={{
              position: 'absolute', bottom: 0, right: 0,
              width: '24px', height: '24px', borderRadius: '50%',
              backgroundColor: '#e05252', border: '2px solid #fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', padding: 0,
            }}
          >
            <Trash2 size={12} color="#fff" />
          </button>
        )}
      </div>
      <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--gray)' }}>
        {photoSrc ? 'Tap photo to change' : 'Tap to add photo'}
      </p>
    </div>
  )

  if (myClasses.length === 0) {
    return (
      <div>
        {PhotoSection}
        {NotifBanner}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 200px)',
            gap: '8px',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '16px', color: 'var(--gray)' }}>No items selected</p>
          {studentEmail && (
            <p style={{ fontSize: '13px', color: '#bbb' }}>
              Logged in as {studentEmail}. An admin needs to assign your classes.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {PhotoSection}
      {NotifBanner}
      <div style={{ overflowX: 'auto', padding: '0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--primary)' }}>
            {COLUMNS.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                style={{
                  padding: '10px 12px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {label}
                  {sortKey === key ? (
                    sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  ) : (
                    <ChevronUp size={14} style={{ opacity: 0.3 }} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={i}
              style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f5f5f5', height: '40px' }}
            >
              <td style={{ padding: '8px 12px', fontSize: '14px', color: 'var(--text)' }}>{row.name}</td>
              <td style={{ padding: '8px 12px', fontSize: '14px', color: 'var(--text)', whiteSpace: 'nowrap' }}>{row.time}</td>
              <td style={{ padding: '8px 12px', fontSize: '14px', color: 'var(--text)', whiteSpace: 'nowrap' }}>{row.room}</td>
              <td style={{ padding: '8px 12px', fontSize: '14px', color: 'var(--text)' }}>{row.instructor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
