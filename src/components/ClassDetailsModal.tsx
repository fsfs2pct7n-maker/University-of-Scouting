import { X, Clock, MapPin, User, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Badge } from '../data/badges'

interface ClassDetailsModalProps {
  badge: Badge | null
  onClose: () => void
}

const FIELD_STYLE = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '12px 0',
  borderBottom: '1px solid #f0ece5',
} as const

const LABEL_STYLE = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#aaa',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  marginBottom: '2px',
}

const VALUE_STYLE = {
  fontSize: '15px',
  color: '#333',
  fontWeight: 500,
}

export default function ClassDetailsModal({ badge, onClose }: ClassDetailsModalProps) {
  const navigate = useNavigate()
  if (!badge) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          zIndex: 1200,
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1201,
          backgroundColor: '#fff',
          borderRadius: '16px 16px 0 0',
          padding: '0 0 env(safe-area-inset-bottom, 0)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
          animation: 'slideInUp 0.25s ease',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#ddd' }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '12px 20px 8px',
          gap: '12px',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#cfb991', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
              Class Details
            </p>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#3a2e1e', lineHeight: 1.3 }}>
              {badge.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px', height: '36px',
              borderRadius: '50%',
              backgroundColor: '#f5f5f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, cursor: 'pointer', border: 'none',
            }}
          >
            <X size={18} color="#666" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '0 20px 20px', overflowY: 'auto', flex: 1 }}>
          {/* Time */}
          <div style={FIELD_STYLE}>
            <Clock size={18} color="#cfb991" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={LABEL_STYLE}>Time</p>
              <p style={VALUE_STYLE}>{badge.time}</p>
            </div>
          </div>

          {/* Room */}
          <div style={FIELD_STYLE}>
            <MapPin size={18} color="#cfb991" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={LABEL_STYLE}>Room / Location</p>
              <p style={VALUE_STYLE}>{badge.room}</p>
            </div>
          </div>

          {/* Instructor */}
          <div style={{ ...FIELD_STYLE, borderBottom: 'none' }}>
            <User size={18} color="#cfb991" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={LABEL_STYLE}>Instructor</p>
              <p style={VALUE_STYLE}>{badge.instructor}</p>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { navigate('/maps'); onClose() }}
              style={{
                flex: 1,
                minWidth: '140px',
                height: '44px',
                backgroundColor: '#cfb991',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <MapPin size={16} />
              View on Map
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                minWidth: '100px',
                height: '44px',
                backgroundColor: 'transparent',
                color: '#888',
                fontWeight: 600,
                fontSize: '14px',
                border: '1.5px solid #e0d9cf',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <ExternalLink size={14} />
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
