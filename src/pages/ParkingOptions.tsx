import { ParkingCircle, AlertTriangle } from 'lucide-react'

const PARKING_SECTIONS = [
  {
    title: 'University Street Parking Garage',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d762.0!2d-86.9218!3d40.4262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e3c5c26cdc69%3A0xa16ece8b2d4f5a1e!2s201%20N%20University%20St%2C%20West%20Lafayette%2C%20IN%2047906!5e0!3m2!1sen!2sus!4v1700000000010',
    address: '201 N University Street, West Lafayette, IN 47906',
  },
  {
    title: 'Additional Parking',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500.0!2d-86.9250!3d40.4240!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e38b68e2a9e1%3A0xab8b50a5c41d1ea7!2sPurdue%20University!5e0!3m2!1sen!2sus!4v1700000000011',
    address: null,
  },
]

export default function ParkingOptions() {
  return (
    <div style={{ padding: '0' }}>
      {PARKING_SECTIONS.map(({ title, mapSrc, address }, i) => (
        <div key={i} style={{ marginBottom: '8px' }}>
          <iframe
            src={mapSrc}
            style={{ width: '100%', height: '220px', border: 'none', display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
          />
          <div style={{ padding: '12px 16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px' }}>
              {title}
            </h2>

            <div
              style={{
                backgroundColor: '#F68B7C',
                borderRadius: '4px',
                padding: '10px 12px',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                marginBottom: '10px',
              }}
            >
              <AlertTriangle size={16} color="#fff" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.5 }}>
                When parking in any lot or garage please be mindful of the spaces that are reserved,
                have a parkMoble sign, area that say the permits enforced 24/7, or the ADA spaces.
                THESE SPACES ARE ENFORCED 24/7.
              </p>
            </div>

            {address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ParkingCircle size={16} color="#cfb991" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: '#cfb991', textDecoration: 'underline' }}
                >
                  {address}
                </a>
              </div>
            )}
          </div>
          {i < PARKING_SECTIONS.length - 1 && (
            <div style={{ height: '8px', backgroundColor: 'var(--light-gray)' }} />
          )}
        </div>
      ))}
    </div>
  )
}
