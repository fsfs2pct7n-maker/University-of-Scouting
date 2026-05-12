import { Clock, MapPin, List, Bell, Award, Building2, CalendarDays } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { icon: Clock, label: 'Schedule', path: '/schedule' },
  { icon: MapPin, label: 'Maps', path: '/maps' },
  { icon: List, label: 'Info', path: '/schedules-info' },
  { icon: Bell, label: 'Alerts', path: '/notifications' },
  { icon: Award, label: 'Badges', path: '/badge-list' },
  { icon: Building2, label: 'Places', path: '/attractions-amenities' },
  { icon: CalendarDays, label: 'Kokomo', path: '/uos-kokomo' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      style={{
        height: 'var(--bottomnav-h)',
        background: 'linear-gradient(180deg, #cfb991 0%, #b39b77 100%)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'stretch',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.10)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: '4px',
        paddingRight: '4px',
      }}
    >
      {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '6px 4px',
              margin: '8px 2px',
              borderRadius: '12px',
              background: active ? '#ffffff' : 'transparent',
              color: active ? '#7a5e2e' : 'rgba(255,255,255,0.95)',
              cursor: 'pointer',
              boxShadow: active ? '0 4px 10px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(207,185,145,0.5)' : 'none',
              transition: 'background-color 180ms ease-out, color 180ms ease-out, box-shadow 180ms ease-out',
              transform: active ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseEnter={e => {
              if (!active) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'
            }}
            onMouseLeave={e => {
              if (!active) e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <Icon size={22} strokeWidth={active ? 2.4 : 1.9} />
            <span
              style={{
                fontSize: '10.5px',
                lineHeight: 1.1,
                fontWeight: active ? 700 : 500,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                textOverflow: 'ellipsis',
                letterSpacing: '-0.005em',
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
