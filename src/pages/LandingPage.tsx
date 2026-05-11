import { useNavigate } from 'react-router-dom'

const FEATURES = [
  { emoji: '📅', title: 'Personal Schedule', desc: 'View all your registered classes and activities in one place.' },
  { emoji: '📍', title: 'Interactive Map', desc: '76 campus pins with search, filters, and turn-by-turn directions.' },
  { emoji: '🔔', title: 'Live Notifications', desc: 'Get instant alerts on class changes, cancellations, and announcements.' },
  { emoji: '📱', title: 'Mobile Ready', desc: 'Designed for phones. Works offline. No app store required.' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f0e8',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Hero */}
      <div style={{
        backgroundColor: '#cfb991',
        padding: '48px 24px 36px',
        textAlign: 'center',
      }}>
        <img
          src="/seal.png"
          alt="Sagamore Council seal"
          style={{ width: 'clamp(80px, 22vw, 140px)', height: 'clamp(80px, 22vw, 140px)', marginBottom: '16px' }}
          onError={e => {
            const el = e.currentTarget
            el.style.display = 'none'
          }}
        />
        <h1 style={{
          fontSize: 'clamp(22px, 6vw, 32px)',
          fontWeight: 900,
          color: '#3a2e1e',
          lineHeight: 1.2,
          marginBottom: '8px',
        }}>
          University of Scouting
        </h1>
        <p style={{
          fontSize: 'clamp(13px, 3.5vw, 16px)',
          color: '#5a4a30',
          maxWidth: '340px',
          margin: '0 auto',
          lineHeight: 1.5,
        }}>
          Event management for Scout Leaders &amp; Participants
        </p>
        <p style={{ fontSize: '12px', color: '#7a6540', marginTop: '6px' }}>
          Crossroads of America Council · Purdue University
        </p>
      </div>

      {/* Feature cards */}
      <div style={{
        padding: '24px 16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <p style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#aaa',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          textAlign: 'center',
          marginBottom: '4px',
        }}>
          Everything you need
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '12px',
        }}>
          {FEATURES.map(f => (
            <div
              key={f.title}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #ece7df',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: '24px', flexShrink: 0, marginTop: '1px' }}>{f.emoji}</span>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#3a2e1e', marginBottom: '3px' }}>
                  {f.title}
                </p>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.45 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '14px',
          padding: '24px 20px',
          border: '1px solid #ece7df',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          textAlign: 'center',
          marginTop: '8px',
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#3a2e1e', marginBottom: '6px' }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
            Sign in with your email to view your personalized schedule.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#cfb991',
              color: '#fff',
              fontWeight: 700,
              fontSize: '16px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 150ms, transform 100ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#b8a07a' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#cfb991' }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)' }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            Sign In
          </button>
        </div>

        <p style={{ fontSize: '11px', color: '#bbb', textAlign: 'center', marginTop: '4px' }}>
          © 2025 University of Scouting · Crossroads of America Council
        </p>
      </div>
    </div>
  )
}
