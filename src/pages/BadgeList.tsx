import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { BADGES, type Badge } from '../data/badges'

type SortKey = keyof Badge
type SortDir = 'asc' | 'desc'

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Class Name' },
  { key: 'time', label: 'Start Time' },
  { key: 'room', label: 'Room' },
  { key: 'instructor', label: 'Instructor' },
]

export default function BadgeList() {
  const [sortKey, setSortKey] = useState<SortKey>('time')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (key: SortKey) => {

    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...BADGES].sort((a, b) => {
    const av = a[sortKey].toLowerCase()
    const bv = b[sortKey].toLowerCase()
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  return (
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
  )
}
