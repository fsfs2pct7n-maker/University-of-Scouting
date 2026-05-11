import { MapPin } from 'lucide-react'
import WarningBoxes from './WarningBoxes'

const LOCATIONS = [
  'Max W. and Maileen Brown Family Hall (BHEE 129)',
  'Armory (AR)',
  'Hall of Life Sciences (LILY 1105)',
  'Purdue Memorial Union',
]

export default function PlacesToEatLunch() {
  return (
    <div style={{ padding: '16px' }}>
      <WarningBoxes />

      <p
        style={{
          fontSize: '14px',
          fontStyle: 'italic',
          color: 'var(--text)',
          margin: '16px 0',
          lineHeight: 1.5,
        }}
      >
        LUNCH WILL BE PICKED UP AT THE PURDUE ARMORY, but these are a few locations you can go to
        sit indoors and eat on campus.
      </p>

      {LOCATIONS.map((loc, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 12px',
            marginBottom: '8px',
            backgroundColor: '#fff',
            border: '1px solid var(--light-gray)',
            borderRadius: '6px',
            boxShadow: '0 1px 2px var(--shadow)',
          }}
        >
          <MapPin size={18} color="#cfb991" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '14px', color: 'var(--text)' }}>{loc}</span>
        </div>
      ))}
    </div>
  )
}
