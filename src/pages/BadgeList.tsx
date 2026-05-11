import { useState } from 'react'
import { ChevronUp, ChevronDown, Clock, MapPin } from 'lucide-react'
import { BADGES, type Badge } from '../data/badges'
import { useIsMobile } from '../hooks/useWindowSize'

type SortKey = keyof Badge
type SortDir = 'asc' | 'desc'

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Class Name' },
  { key: 'time', label: 'Start Time' },
  { key: 'room', label: 'Room' },
  { key: 'instructor', label: 'Instructor' },
]

export default function BadgeList() {
  const isMobile = useIsMobile()
  const [sortKey, setSortKey] = useState<SortKey>('time')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = [...BADGES].sort((a, b) => {
    const av = a[sortKey].toLowerCase()
    const bv = b[sortKey].toLowerCase()
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  if (sorted.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '10px', padding: '32px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: '48px' }}>📋</span>
        <p style={{ fontSize: '16px', fontWeight: 700, color: '#555' }}>No classes available</p>
        <p style={{ fontSize: '13px', color: '#aaa' }}>Check back later for the full class list.</p>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
          {sorted.length} classes available
        </p>
        {sorted.map((badge, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '14px 16px',
              border: '1px solid #f0ece5',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
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
        ))}
      </div>
    )
  }

  return (
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
              style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafaf8', height: '44px' }}
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
  )
}
