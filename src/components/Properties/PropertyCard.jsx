import { useState } from 'react'
import { Link } from 'react-router-dom'
import MapModal from '~/components/Modal/MapModal'

function PropertyCard({ property }) {
  const { _id, name, address, location } = property

  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleOpenMap = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMapOpen(true)
  }

  return (
    <>
      <Link
        to={`/properties/${_id}/rooms`}
        className="group bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shrink-0 shadow-2xs">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Đang hoạt động
            </span>
          </div>

          {/* Tên địa điểm */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1.5">
            {name || 'Chưa đặt tên địa điểm'}
          </h3>

          {/* Địa chỉ */}
          <div className="flex items-start justify-between gap-2 text-slate-500 text-sm mb-4">
            <div className="flex items-start gap-1.5 text-slate-500 text-sm mb-4">
              <svg
                className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="line-clamp-2 leading-relaxed">
                {address || 'Chưa cập nhật địa chỉ'}
              </p>
            </div>

            {location && (
              <button
                type="button"
                onClick={handleOpenMap}
                className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                title="Xem bản đồ"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Footer Card: Quy mô & Action link */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end text-xs text-slate-600 mt-2">
          <div className="flex items-center gap-1 text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Xem danh sách phòng</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        location={location}
        title={name}
        address={address}
      />
    </>
  )
}

export default PropertyCard