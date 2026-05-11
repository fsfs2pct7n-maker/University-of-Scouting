import { ExternalLink } from 'lucide-react'
import WarningBoxes from './WarningBoxes'

const EVENTS = [
  {
    time: '6:30 AM–4:00 PM',
    name: "Vendor Midway and Toy Drive for Lafayette Urban Ministry's Jubilee Christmas",
    location: 'Armory',
  },
  {
    time: '8:00 AM–2:00 PM',
    name: 'American Red Cross Blood Drive',
    location: 'Armory',
  },
]

export default function VendorMidwayBloodDrive() {
  return (
    <div style={{ padding: '16px' }}>
      <WarningBoxes />

      <div style={{ marginTop: '16px', marginBottom: '24px' }}>
        {EVENTS.map((event, i) => (
          <div
            key={i}
            style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--light-gray)',
              display: 'flex',
              gap: '12px',
            }}
          >
            <div style={{ minWidth: '130px', fontSize: '13px', color: 'var(--gray)', flexShrink: 0 }}>
              {event.time}
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{event.name}</p>
              <p style={{ fontSize: '13px', color: 'var(--gray)', marginTop: '2px' }}>{event.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: '#2d6e2d',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>TOY DRIVE</p>
        <p style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>SAT DEC 6</p>
        <p style={{ fontSize: '14px', marginBottom: '4px' }}>PURDUE ARMORY</p>
        <p style={{ fontSize: '13px' }}>7AM – 4PM</p>
      </div>

      <div
        style={{
          backgroundColor: '#1a3a6b',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>BLOOD DRIVE</p>
        <p style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>Shake Up Your Holiday Tradition</p>
        <p style={{ fontSize: '13px', marginBottom: '8px' }}>American Red Cross</p>
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#fff',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
          }}
        >
          <span style={{ fontSize: '11px', color: '#333', textAlign: 'center' }}>QR Code</span>
        </div>
      </div>

      <a
        href="https://www.redcrossblood.org/give.html"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '14px',
          color: '#0066cc',
          textDecoration: 'underline',
        }}
      >
        www.redcrossblood.org/give.html
        <ExternalLink size={13} />
      </a>
    </div>
  )
}
