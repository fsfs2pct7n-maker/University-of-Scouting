import { ExternalLink, Gavel, FileText } from 'lucide-react'

const LINKS = [
  {
    heading: 'Bid Now',
    label: 'Visit the Online Auction at scoutingauction.com',
    url: 'https://www.scoutingauction.com',
    Icon: Gavel,
  },
  {
    heading: 'Auction Catalog',
    label: 'View the Full Auction Item List (PDF)',
    url: 'https://auctioneersoftware.s3.us-east-1.amazonaws.com/gflr/2025/11/0IbdPumMwilx1Le0fMFyOIoZ.pdf',
    Icon: FileText,
  },
]

export default function OnlineAuction() {
  return (
    <div style={{ padding: '0' }}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2a1f0e 0%, #4a3520 100%)',
          padding: '28px 20px',
          textAlign: 'center',
          borderBottom: '3px solid #cfb991',
        }}
      >
        <div
          style={{
            backgroundColor: '#cfb991',
            borderRadius: '8px',
            padding: '10px 20px',
            display: 'inline-block',
            marginBottom: '14px',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#2a1f0e', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            GESWEIN FARM AND LAND
          </span>
        </div>
        <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
          University of Scouting
        </p>
        <p style={{ fontSize: '14px', color: '#cfb991', fontWeight: 500 }}>
          Online Auction — Powered by Geswein Farm and Land
        </p>
      </div>

      {/* Description */}
      <div style={{ padding: '20px 16px 8px' }}>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>
          Support University of Scouting by bidding on exclusive items in our online auction. All proceeds benefit Scouting programs in our district.
        </p>
      </div>

      {/* Link Cards */}
      <div style={{ padding: '8px 16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {LINKS.map(({ heading, label, url, Icon }) => (
          <div key={heading}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--gray)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '6px',
                paddingLeft: '2px',
              }}
            >
              {heading}
            </p>
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
    </div>
  )
}
