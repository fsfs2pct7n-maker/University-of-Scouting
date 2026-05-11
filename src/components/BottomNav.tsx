import { Clock, MapPin, List, Bell, Award, Building2, CalendarDays } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { icon: Clock, label: 'Schedule', path: '/schedule' },
  { icon: MapPin, label: 'Maps', path: '/maps' },
  { icon: List, label: 'Schedules', path: '/schedules-info' },
  { icon: Bell, label: 'Alerts', path: '/notifications' },
  { icon: Award, label: 'Badges', path: '/badge-list' },
  { icon: Building2, label: 'Attractions', path: '/attractions-amenities' },
  { icon: CalendarDays, label: 'Kokomo', path: '/uos-kokomo' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      style={{
        height: '80px',
        backgroundColor: 'var(--primary)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'stretch',
        boxShadow: '0 -1px 3px var(--shadow)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              color: 'var(--text)',
              padding: '6px 2px',
              border: 'none',
              cursor: 'pointer',
              opacity: active ? 1 : 0.65,
              transition: 'all 200ms ease-in-out',
              background: active ? 'rgba(255,255,255,0.3)' : 'none',
              borderRadius: '8px',
              transform: active ? 'scale(1.05)' : 'scale(1)',
              // 44px minimum touch target via min-height from parent
            }}
            className="hover:bg-white/20 active:scale-95"
            aria-label={label}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.75} />
            <span
              style={{
                fontSize: '11px',
                lineHeight: 1.1,
                textAlign: 'center',
                fontWeight: active ? 700 : 400,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                textOverflow: 'ellipsis',
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
