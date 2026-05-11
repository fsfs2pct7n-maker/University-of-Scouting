import { useState, useRef } from 'react'
import {
  ChevronUp, ChevronDown, Bell, BellOff,
  Camera, Trash2, Search, X, Printer,
  BookOpen, UtensilsCrossed, MapPin, Clock,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getStudentRecord, updateStudentPhoto, deleteStudentPhoto } from '../utils/auth'
import { BADGES, type Badge } from '../data/badges'
import { useIsMobile } from '../hooks/useWindowSize'
import {
  isSupported as notifSupported,
  getPermission,
  requestPermission,
  getNotificationPref,
  setNotificationPref,
} from '../services/notificationService'
import { printSchedule } from '../services/pdfService'
import ClassDetailsModal from '../components/ClassDetailsModal'

type SortKey = keyof Badge
type SortDir = 'asc' | 'desc'

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Class Name' },
  { key: 'time', label: 'Time' },
  { key: 'room', label: 'Room' },
  { key: 'instructor', label: 'Instructor' },
]

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '12px 14px',
      border: '1px solid #f0ece5',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '120px',
      flex: '1 1 120px',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '9px',
        backgroundColor: '#f7f2eb',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1px' }}>
          {label}
        </p>
        <p style={{ fontSize: '14px', fontWeight: 700, color: '#3a2e1e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {value}
        </p>
      </div>
    </div>
  )
}

// ── Mobile row card ───────────────────────────────────────────────────────────
function MobileClassCard({ badge, onClick }: { badge: Badge; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '14px 16px',
        border: '1px solid #f0ece5',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        borderLeft: '4px solid #cfb991',
      }}
    >
      <p style={{ fontSize: '15px', fontWeight: 700, color: '#3a2e1e', marginBottom: '6px', lineHeight: 1.3 }}>
        {badge.name}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px' }}>
        <span style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} color="#cfb991" /> {badge.time}
        </span>
        <span style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} color="#cfb991" /> {badge.room}
        </span>
      </div>
      <p style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{badge.instructor}</p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function IndividualSchedule() {
  const { studentEmail } = useAuth()
  const isMobile = useIsMobile()
  const [sortKey, setSortKey] = useState<SortKey>('time')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [notifEnabled, setNotifEnabled] = useState(() => getNotificationPref())
  const notifPermission = getPermission()
  const [photoSrc, setPhotoSrc] = useState<string | undefined>(
    () => (studentEmail ? getStudentRecord(studentEmail)?.photoBase64 : undefined)
  )
  const [photoHover, setPhotoHover] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Photo handlers ────────────────────────────────────────────────────────
  function handlePhotoClick() { fileInputRef.current?.click() }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !studentEmail) return
    if (file.size > 2 * 1024 * 1024) { alert('Photo must be under 2 MB.'); return }
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

  // ── Notifications ─────────────────────────────────────────────────────────
  async function handleToggleNotifications() {
    if (notifEnabled) {
      setNotificationPref(false); setNotifEnabled(false); return
    }
    const perm = await requestPermission()
    if (perm === 'granted') { setNotificationPref(true); setNotifEnabled(true) }
  }

  // ── Data ──────────────────────────────────────────────────────────────────
  const record = studentEmail ? getStudentRecord(studentEmail) : undefined
  const registeredNames = record?.classes ?? []
  const myClasses = BADGES.filter(b => registeredNames.includes(b.name))

  // ── Stats ─────────────────────────────────────────────────────────────────
  const uniqueRooms = new Set(myClasses.map(c => c.room)).size
  const times = myClasses.map(c => c.time)
  const timeRange = times.length
    ? times.length === 1
      ? times[0]
      : `${times.reduce((a, b) => a < b ? a : b)} – ${times.reduce((a, b) => a > b ? a : b)}`
    : '—'

  // ── Sort + search ─────────────────────────────────────────────────────────
  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = myClasses.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.room.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey].toLowerCase()
    const bv = b[sortKey].toLowerCase()
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  // ── Notification banner ───────────────────────────────────────────────────
  const NotifBanner = notifSupported() && notifPermission !== 'denied' && (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '10px 14px',
      backgroundColor: notifEnabled ? '#f0fdf4' : '#f7f2eb',
      border: `1px solid ${notifEnabled ? '#86efac' : '#e8dcc5'}`,
      borderRadius: '8px', margin: '0 0 12px',
    }}>
      {notifEnabled ? <Bell size={16} color="#16a34a" /> : <BellOff size={16} color="#cfb991" />}
      <p style={{ flex: 1, fontSize: '13px', color: '#555' }}>
        {notifEnabled ? 'Class notifications are enabled.' : 'Get notified about class changes.'}
      </p>
      <button
        onClick={handleToggleNotifications}
        style={{
          padding: '5px 12px', fontSize: '12px', fontWeight: 600,
          backgroundColor: notifEnabled ? 'transparent' : '#cfb991',
          color: notifEnabled ? '#888' : '#fff',
          border: notifEnabled ? '1px solid #e0d9cf' : 'none',
          borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap',
        }}
      >
        {notifEnabled ? 'Disable' : 'Enable'}
      </button>
    </div>
  )

  // ── Photo section ─────────────────────────────────────────────────────────
  const PhotoSection = studentEmail && (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 16px 0' }}>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          onClick={handlePhotoClick}
          onMouseEnter={() => setPhotoHover(true)}
          onMouseLeave={() => setPhotoHover(false)}
          style={{
            width: '80px', height: '80px', borderRadius: '50%',
            overflow: 'hidden', border: '3px solid #cfb991',
            backgroundColor: '#f7f2eb', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}
        >
          {photoSrc
            ? <img src={photoSrc} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <Camera size={26} color="#cfb991" />}
          {photoHover && (
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <Camera size={20} color="#fff" />
            </div>
          )}
        </div>
        {photoSrc && (
          <button onClick={handlePhotoDelete} title="Remove photo" style={{ position: 'absolute', bottom: 0, right: 0, width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#e05252', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
            <Trash2 size={11} color="#fff" />
          </button>
        )}
      </div>
      <p style={{ marginTop: '6px', fontSize: '11px', color: 'var(--gray)' }}>
        {photoSrc ? 'Tap to change' : 'Tap to add photo'}
      </p>
    </div>
  )

  // ── Empty state ───────────────────────────────────────────────────────────
  if (myClasses.length === 0) {
    return (
      <div>
        {PhotoSection}
        <div style={{ padding: '12px' }}>{NotifBanner}</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 280px)', gap: '12px', padding: '32px 24px', textAlign: 'center' }}>
          <span style={{ fontSize: '48px' }}>📚</span>
          <p style={{ fontSize: '17px', fontWeight: 700, color: '#3a2e1e' }}>No classes registered yet</p>
          <p style={{ fontSize: '14px', color: '#aaa', maxWidth: '280px', lineHeight: 1.5 }}>
            Your schedule will appear here once an admin assigns your classes. Check back soon!
          </p>
          {studentEmail && (
            <p style={{ fontSize: '12px', color: '#ccc', marginTop: '4px' }}>Signed in as {studentEmail}</p>
          )}
        </div>
      </div>
    )
  }

  // ── Full schedule ─────────────────────────────────────────────────────────
  return (
    <div>
      {PhotoSection}

      <div style={{ padding: '12px 0 0' }}>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <StatCard icon={<BookOpen size={17} color="#cfb991" />} label="Classes" value={`${myClasses.length} registered`} />
          <StatCard icon={<UtensilsCrossed size={17} color="#cfb991" />} label="Lunch" value={record?.lunch || 'Not set'} />
          <StatCard icon={<MapPin size={17} color="#cfb991" />} label="Locations" value={`${uniqueRooms} rooms`} />
          <StatCard icon={<Clock size={17} color="#cfb991" />} label="Schedule" value={timeRange} />
        </div>

        {/* Notification banner */}
        {NotifBanner}

        {/* Search + print toolbar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} color="#cfb991" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search classes, rooms, instructors…"
              style={{
                width: '100%', height: '44px',
                padding: '0 36px 0 36px',
                fontSize: '14px',
                border: '1.5px solid #e0d9cf',
                borderRadius: '10px',
                outline: 'none',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#cfb991' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#e0d9cf' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                <X size={15} color="#aaa" />
              </button>
            )}
          </div>
          <button
            onClick={() => studentEmail && printSchedule(studentEmail, myClasses, record?.lunch ?? '')}
            title="Print schedule"
            style={{
              height: '44px', width: '44px', flexShrink: 0,
              backgroundColor: '#fff',
              border: '1.5px solid #e0d9cf',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Printer size={18} color="#cfb991" />
          </button>
        </div>

        {/* No search results */}
        {filtered.length === 0 && searchQuery && (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <span style={{ fontSize: '36px', display: 'block', marginBottom: '10px' }}>🔍</span>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#555', marginBottom: '6px' }}>No classes found</p>
            <p style={{ fontSize: '13px', color: '#aaa' }}>No results for "{searchQuery}"</p>
          </div>
        )}

        {/* Mobile: card list */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sorted.map((badge, i) => (
              <MobileClassCard key={i} badge={badge} onClick={() => setSelectedBadge(badge)} />
            ))}
          </div>
        ) : (
          /* Desktop: sortable table */
          <div style={{ overflowX: 'auto', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', border: '1px solid #f0ece5' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '540px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--primary)' }}>
                  {COLUMNS.map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: 'var(--text)', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {label}
                        {sortKey === key
                          ? sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                          : <ChevronUp size={13} style={{ opacity: 0.3 }} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedBadge(row)}
                    style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafaf8', height: '44px', cursor: 'pointer', transition: 'background-color 150ms' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f7f2eb' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#fafaf8' }}
                  >
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>{row.name}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--text)', whiteSpace: 'nowrap' }}>{row.time}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--text)', whiteSpace: 'nowrap' }}>{row.room}</td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', color: 'var(--text)' }}>{row.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {sorted.length > 0 && (
          <p style={{ fontSize: '12px', color: '#bbb', marginTop: '10px', textAlign: 'center' }}>
            Tap a class for details
          </p>
        )}
      </div>

      <ClassDetailsModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </div>
  )
}
