import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute -inset-2 bg-indigo-500/30 rounded-full animate-ping"></div>
        <div class="relative w-9 h-9 bg-indigo-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  })
}

function RecenterMap({ lat, lng }) {
  const map = useMap()

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 16)
      const timer = setTimeout(() => {
        map.invalidateSize()
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [lat, lng, map])

  return null
}

function MapModal({ isOpen, onClose, location, title = 'Vị trí địa điểm', address = '' }) {

  if (!isOpen) return null

  const lat = location?.lat
  const lng = location?.lng
  const isValidLocation = typeof lat === 'number' && typeof lng === 'number'

  const googleMapsUrl = isValidLocation
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    : '#'
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all border border-slate-100 animate-scaleUp flex flex-col">
          <div className="flex items-start justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 pr-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-1">
                  {title}
                </h3>
                {address && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                    {address}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer shrink-0"
              title="Đóng"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="relative w-full h-90 sm:h-115 bg-slate-100">
            {isValidLocation ? (
              <MapContainer
                center={[lat, lng]}
                zoom={16}
                scrollWheelZoom={true}
                className="w-full h-full z-10"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]} icon={createCustomIcon()}>
                  <Popup>
                    <div className="p-1 max-w-50">
                      <h4 className="font-bold text-xs text-slate-900 mb-0.5">{title}</h4>
                      {address && <p className="text-[11px] text-slate-600 leading-tight">{address}</p>}
                    </div>
                  </Popup>
                </Marker>
                <RecenterMap lat={lat} lng={lng} />
              </MapContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2 p-6 text-center">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xs sm:text-sm font-medium">Chưa có thông tin tọa độ vị trí cho địa điểm này</p>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 border-t border-slate-100 bg-white">
            <div className="text-xs text-slate-500 font-medium text-left w-full sm:w-auto">
              {isValidLocation ? (
                <span className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Tọa độ: <strong className="font-semibold text-slate-800">{lat.toFixed(6)}, {lng.toFixed(6)}</strong>
                </span>
              ) : (
                <span className="text-slate-400">Vị trí chưa xác thực</span>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 w-full sm:w-auto">
              {isValidLocation && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Mở Google Maps
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MapModal