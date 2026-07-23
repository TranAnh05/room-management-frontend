import { formatCurrency } from '~/utils/formatters'

function RoomCard({ room, onViewDetail, onAddTenant }) {
  const { _id, roomNumber, price, area, status, tenantName } = room

  const isAvailable = status?.toLowerCase() === 'available'

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Phòng: <span className="text-indigo-600 font-extrabold">{roomNumber}</span>
            </h3>
          </div>

          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Còn trống
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Đang cho thuê
            </span>
          )}
        </div>

        <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 mb-4 space-y-2">
          {!isAvailable ? (
            <div className="text-sm">
              <span className="text-slate-500 font-medium">Khách thuê: </span>
              <span className="font-bold text-slate-900">
                {tenantName}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Giá thuê:</span>
              <span className="font-bold text-indigo-600 text-sm">
                {formatCurrency(price)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
            <span>
              Diện tích: <strong className="text-slate-700 font-semibold">{area}m²</strong>
            </span>
            {!isAvailable && (
              <span>
                Giá: <strong className="text-slate-700 font-semibold">{formatCurrency(price)}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
        {isAvailable && (
          <button
            type="button"
            onClick={() => onAddTenant?.(_id)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 transition-colors cursor-pointer"
          >
            Thêm khách
          </button>
        )}

        <button
          type="button"
          onClick={() => onViewDetail?.(_id)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors cursor-pointer"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}

export default RoomCard