import { useState, useMemo, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { X, ExternalLink, MapPin, Search } from 'lucide-react'
import { scoutingLocations } from '../data/scoutingLocations'
import type { ScoutingLocation } from '../data/scoutingLocations'

// ─── Fix Leaflet default icon paths broken by Vite ───────────────────────────
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ─── Color config ─────────────────────────────────────────────────────────────
type FilterKey = 'all' | 'off-campus' | 'on-campus' | 'parking'

const PIN_COLORS: Record<string, string> = {
  off: '#E91E63',   // pink/salmon
  on: '#2196F3',    // blue
  parking: '#757575', // gray
  armory: '#FF5722', // deep orange — special
}

function getPinColor(loc: ScoutingLocation): string {
  if (loc.type === 'Parking') return PIN_COLORS.parking
  if (loc.code === 'AR') return PIN_COLORS.armory
  return loc.onCampus ? PIN_COLORS.on : PIN_COLORS.off
}

function createDivIcon(loc: ScoutingLocation) {
  const color = getPinColor(loc)
  const label = loc.code.length > 6 ? loc.code.slice(0, 6) : loc.code
  return L.divIcon({
    className: '',
    html: `
      <div style="
        background:${color};
        color:#fff;
        border:2px solid rgba(0,0,0,0.25);
        border-radius:4px;
        padding:2px 4px;
        font-size:10px;
        font-weight:700;
        font-family:system-ui,sans-serif;
        white-space:nowrap;
        box-shadow:0 1px 4px rgba(0,0,0,0.3);
        cursor:pointer;
        line-height:1.2;
      ">${label}</div>`,
    iconSize: undefined,
    iconAnchor: [0, 0],
  })
}

// ─── Tile sets ─────────────────────────────────────────────────────────────────
const TILES = {
  map: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
  },
}

// ─── Sub-component: fly to selected location ─────────────────────────────────
function FlyTo({ location }: { location: ScoutingLocation | null }) {
  const map = useMap()
  useEffect(() => {
    if (location) {
      map.flyTo([location.latitude, location.longitude], Math.max(map.getZoom(), 15), {
        duration: 0.8,
      })
    }
  }, [location, map])
  return null
}

// ─── Filter button ────────────────────────────────────────────────────────────
const FILTERS: { key: FilterKey; label: string; color: string }[] = [
  { key: 'all', label: 'All (76)', color: '#333' },
  { key: 'off-campus', label: 'Off-Campus', color: PIN_COLORS.off },
  { key: 'on-campus', label: 'On-Campus', color: PIN_COLORS.on },
  { key: 'parking', label: 'Parking', color: PIN_COLORS.parking },
]

// ─── Main component ───────────────────────────────────────────────────────────
export default function LiveMapComponent() {
  const [tileMode, setTileMode] = useState<'map' | 'satellite'>('map')
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [selectedLocation, setSelectedLocation] = useState<ScoutingLocation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const filteredLocations = useMemo(() => {
    let locs = scoutingLocations
    if (activeFilter === 'off-campus') locs = locs.filter((l) => !l.onCampus)
    else if (activeFilter === 'on-campus') locs = locs.filter((l) => l.onCampus && l.type !== 'Parking')
    else if (activeFilter === 'parking') locs = locs.filter((l) => l.type === 'Parking')

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      locs = locs.filter(
        (l) => l.code.toLowerCase().includes(q) || l.name.toLowerCase().includes(q)
      )
    }
    return locs
  }, [activeFilter, searchQuery])

  const tile = TILES[tileMode]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>

      {/* ── Controls bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #ddd',
          flexWrap: 'wrap',
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        {/* Map / Satellite toggle */}
        <div
          style={{
            display: 'flex',
            border: '1px solid #ddd',
            borderRadius: '6px',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {(['map', 'satellite'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTileMode(mode)}
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                fontWeight: tileMode === mode ? 700 : 400,
                backgroundColor: tileMode === mode ? '#cfb991' : '#fff',
                color: tileMode === mode ? '#fff' : '#333',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {mode === 'map' ? '🗺 Map' : '🛰 Satellite'}
            </button>
          ))}
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', flex: 1 }}>
          {FILTERS.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: activeFilter === key ? 700 : 400,
                borderRadius: '12px',
                border: `1.5px solid ${color}`,
                backgroundColor: activeFilter === key ? color : '#fff',
                color: activeFilter === key ? '#fff' : color,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search toggle */}
        <button
          onClick={() => setShowSearch((s) => !s)}
          style={{ color: '#666', flexShrink: 0 }}
          aria-label="Search locations"
        >
          <Search size={18} />
        </button>
      </div>

      {/* ── Search bar ── */}
      {showSearch && (
        <div style={{ padding: '6px 10px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
          <input
            autoFocus
            type="text"
            placeholder="Search by code or name…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 10px',
              fontSize: '13px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              outline: 'none',
            }}
          />
        </div>
      )}

      {/* ── Result count ── */}
      {(activeFilter !== 'all' || searchQuery) && (
        <div
          style={{
            padding: '4px 10px',
            fontSize: '11px',
            color: '#666',
            backgroundColor: '#fafafa',
            borderBottom: '1px solid #eee',
            flexShrink: 0,
          }}
        >
          Showing {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* ── Map ── */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <MapContainer
          center={[40.42, -86.895]}
          zoom={11}
          style={{ width: '100%', height: '100%' }}
          zoomControl={true}
        >
          <TileLayer url={tile.url} attribution={tile.attribution} />
          <FlyTo location={selectedLocation} />

          {filteredLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={createDivIcon(loc)}
              eventHandlers={{
                click: () => setSelectedLocation(loc),
              }}
            >
              <Popup>
                <strong>{loc.code}</strong>
                <br />
                <span style={{ fontSize: '12px' }}>{loc.name}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* ── Legend ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            backgroundColor: 'rgba(255,255,255,0.93)',
            borderRadius: '8px',
            padding: '8px 10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            fontSize: '11px',
          }}
        >
          {[
            { color: PIN_COLORS.off, label: 'Off-Campus' },
            { color: PIN_COLORS.on, label: 'On-Campus' },
            { color: PIN_COLORS.parking, label: 'Parking' },
            { color: PIN_COLORS.armory, label: 'Armory' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: color,
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
              <span style={{ color: '#333' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Info panel (slides in from right) ── */}
      {selectedLocation && (
        <>
          {/* Overlay (mobile only feel) */}
          <div
            onClick={() => setSelectedLocation(null)}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1100,
              backgroundColor: 'rgba(0,0,0,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(300px, 85vw)',
              backgroundColor: '#fff',
              boxShadow: '-4px 0 16px rgba(0,0,0,0.2)',
              zIndex: 1200,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Panel header */}
            <div
              style={{
                backgroundColor: '#cfb991',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.5px',
                  }}
                >
                  {selectedLocation.code}
                </span>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                style={{ color: '#fff' }}
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>

            {/* Panel body */}
            <div style={{ padding: '14px', flex: 1 }}>
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#333',
                  marginBottom: '12px',
                  lineHeight: 1.4,
                }}
              >
                {selectedLocation.name}
              </h3>

              {[
                { label: 'Type', value: selectedLocation.type },
                { label: 'On Campus', value: selectedLocation.onCampus ? 'Yes' : 'No' },
                { label: 'Address', value: selectedLocation.address },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '13px', color: '#333' }}>{value}</p>
                </div>
              ))}

              {/* Color badge */}
              <div style={{ marginBottom: '14px' }}>
                <p style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Category
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    backgroundColor: getPinColor(selectedLocation),
                  }}
                >
                  {selectedLocation.type === 'Parking'
                    ? 'Parking'
                    : selectedLocation.onCampus
                    ? 'On-Campus'
                    : 'Off-Campus'}
                </span>
              </div>

              {/* Classes (future data) */}
              {selectedLocation.classes.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <p style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Classes Held Here
                  </p>
                  {selectedLocation.classes.map((c) => (
                    <div
                      key={c}
                      style={{
                        padding: '6px 8px',
                        marginBottom: '4px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        fontSize: '13px',
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Open in Google Maps */}
            <div style={{ padding: '12px 14px', borderTop: '1px solid #eee', flexShrink: 0 }}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#cfb991',
                  color: '#fff',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '13px',
                  textDecoration: 'none',
                }}
              >
                <MapPin size={15} />
                Open in Google Maps
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
