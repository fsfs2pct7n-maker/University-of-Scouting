import { ExternalLink, Hotel, UtensilsCrossed, Landmark } from 'lucide-react'

const SECTIONS = [
  {
    heading: 'Accommodations',
    label: 'The Best Hotels in Lafayette, West Lafayette',
    url: 'https://www.homeofpurdue.com/hotels/',
    Icon: Hotel,
  },
  {
    heading: 'Restaurants',
    label: 'Explore the Best Restaurants & Dining Options in Greater Lafayette',
    url: 'https://www.homeofpurdue.com/restaurants/',
    Icon: UtensilsCrossed,
  },
  {
    heading: 'Things to Do In Town',
    label: 'Fun Activities & Things to Do in Greater Lafayette',
    url: 'https://www.homeofpurdue.com/things-to-do/',
    Icon: Landmark,
  },
]

export default function AttractionsAmenities() {
  return (
    <div style={{ padding: '16px' }}>
      {SECTIONS.map(({ heading, label, url, Icon }) => (
        <div key={heading} style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--gray)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px',
              paddingLeft: '2px',
            }}
          >
            {heading}
          </h2>
          <a
            href={url}
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
                ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 6px 16px rgba(0,0,0,0.12)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 2px 8px rgba(0,0,0,0.08)'
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
                <Icon size={18} color="#cfb991" />
              </div>
              <span
                style={{
                  flex: 1,
                  fontSize: '14px',
                  color: '#cfb991',
                  textDecoration: 'underline',
                  lineHeight: 1.4,
                }}
              >
                {label}
              </span>
              <ExternalLink size={14} color="#cfb991" style={{ flexShrink: 0 }} />
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}
