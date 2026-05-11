import { useNavigate } from 'react-router-dom'
import { CalendarDays, Store, UtensilsCrossed, ChevronRight } from 'lucide-react'

const CARDS = [
  {
    label: 'General Schedule',
    description: 'Full event timeline from 6:30 AM – 5:30 PM',
    path: '/schedules-info/general-schedule',
    Icon: CalendarDays,
  },
  {
    label: 'Vendor Midway, Blood Drive, and Toy Drive',
    description: 'Vendor booths, Red Cross blood drive & toy donations',
    path: '/schedules-info/vendor-midway-blood-drive-toy-drive',
    Icon: Store,
  },
  {
    label: 'Places to Eat Lunch',
    description: 'On-campus dining locations for the lunch break',
    path: '/schedules-info/places-to-eat-lunch',
    Icon: UtensilsCrossed,
  },
]

export default function SchedulesInfo() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {CARDS.map(({ label, description, path, Icon }) => (
        <div
          key={path}
          onClick={() => navigate(path)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f0ece5',
            cursor: 'pointer',
            transition: 'box-shadow 200ms ease, transform 200ms ease',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)'
            ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
            ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#f7f2eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={20} color="#cfb991" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: '2px',
                lineHeight: 1.3,
              }}
            >
              {label}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--gray)', lineHeight: 1.3 }}>
              {description}
            </p>
          </div>
          <ChevronRight size={18} color="#cfb991" style={{ flexShrink: 0 }} />
        </div>
      ))}
    </div>
  )
}
