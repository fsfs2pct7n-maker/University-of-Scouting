import { useState } from 'react'
import LiveMapComponent from '../components/LiveMapComponent'

const TABS = ['Live Map', 'Campus Map'] as const
type Tab = (typeof TABS)[number]

const CAMPUS_MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0!2d-86.9181!3d40.4259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e38b68e2a9e1%3A0xab8b50a5c41d1ea7!2sPurdue%20University!5e0!3m2!1sen!2sus!4v1700000000001'

export default function Maps() {
  const [activeTab, setActiveTab] = useState<Tab>('Live Map')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)',
        padding: 0,
      }}
    >
      {/* Tab bar */}
      <div style={{ display: 'flex', backgroundColor: '#fff', borderBottom: '1px solid #ddd', flexShrink: 0 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '15px',
              fontWeight: activeTab === tab ? 700 : 400,
              color: activeTab === tab ? 'var(--text)' : 'var(--gray)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid #cfb991' : '3px solid transparent',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {activeTab === 'Live Map' ? (
          <LiveMapComponent />
        ) : (
          <iframe
            src={CAMPUS_MAP_SRC}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Campus Map"
          />
        )}
      </div>
    </div>
  )
}
