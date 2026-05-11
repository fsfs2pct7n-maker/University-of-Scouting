const SPONSORS = [
  {
    name: 'Indiana University Health',
    subtitle: 'Presenting Sponsor',
    initials: 'IU',
    bg: '#8B0000',
  },
  {
    name: 'Summit Bechtel Reserve',
    subtitle: 'National High-Adventure Base',
    initials: '🐻',
    bg: '#2d5a27',
  },
]

export default function Sponsors() {
  return (
    <div style={{ padding: '16px' }}>
      <p style={{
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--gray)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '14px',
        paddingLeft: '2px',
      }}>
        Event Sponsors
      </p>

      <div style={{ display: 'flex', gap: '12px' }}>
        {SPONSORS.map(({ name, subtitle, initials, bg }) => (
          <div
            key={name}
            style={{
              flex: 1,
              padding: '16px',
              backgroundColor: '#fff',
              border: '1px solid #f0ece5',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
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
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              border: '2px solid rgba(0,0,0,0.15)',
              fontSize: initials.length === 2 ? '17px' : '26px',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '0.5px',
            }}>
              {initials}
            </div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.3 }}>
              {name}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--gray)' }}>{subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
