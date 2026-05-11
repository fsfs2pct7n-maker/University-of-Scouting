import { ExternalLink, CalendarCheck } from 'lucide-react'

export default function UosKokomo() {
  return (
    <div style={{ padding: '0' }}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #8B0000 0%, #5a0000 50%, #8B0000 100%)',
          padding: '32px 20px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Sagamore Council
        </p>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
          University of Scouting
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
          at Indiana University Kokomo
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
          Presented by IU Health · March 7, 2026
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px' }}>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, marginBottom: '20px' }}>
          Register today for the University of Scouting presented by IU Health at Indiana University Kokomo!
        </p>

        {/* Registration card */}
        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '6px',
          paddingLeft: '2px',
        }}>
          Register Now
        </p>
        <a
          href="https://scoutingevent.com/162-2025_University_of_Scouting_at_Indiana_University_Kokomo_by_Indiana_University_Health"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #f0ece5',
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
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#f7f2eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CalendarCheck size={18} color="#cfb991" />
            </div>
            <span style={{ flex: 1, fontSize: '14px', color: '#cfb991', textDecoration: 'underline', lineHeight: 1.4 }}>
              Register at scoutingevent.com
            </span>
            <ExternalLink size={14} color="#cfb991" style={{ flexShrink: 0 }} />
          </div>
        </a>
      </div>
    </div>
  )
}
