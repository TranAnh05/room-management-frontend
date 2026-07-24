import { formatCurrency, formatDate } from '~/utils/formatters'

function RoomInfoCard({ room, contractHolder, onCheckout, onViewHistory }) {
  if (!room) return null

  const isRented = room.status === 'rented' || Boolean(contractHolder)
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between gap-6 h-full">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Thông tin phòng
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Phòng {room.roomNumber}
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-2xs shrink-0 ${
              isRented
                ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isRented ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
              }`}
            />
            {isRented ? 'Đang cho thuê' : 'Phòng trống'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-100 mb-5">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Giá thuê / tháng
            </span>
            <p className="text-base sm:text-lg font-extrabold text-indigo-600">
              {formatCurrency(room.price)}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Diện tích
            </span>
            <p className="text-base sm:text-lg font-extrabold text-slate-800">
              {room.area ? `${room.area} m²` : 'N/A'}
            </p>
          </div>
        </div>
        {isRented ? (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Thời hạn hợp đồng
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Ngày bắt đầu</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(contractHolder?.rentStartDate)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Ngày hết hạn</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(contractHolder?.rentEndDate)}
                  </span>
                </div>
              </div>
            </div>
            {contractHolder?.deposit !== undefined && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/80 text-xs mt-2">
                <span className="text-indigo-900 font-medium">Tiền cọc phòng:</span>
                <span className="font-bold text-indigo-700">
                  {formatCurrency(contractHolder.deposit)}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500 border border-dashed border-slate-200">
            Phòng hiện đang trống. Chưa có thông tin hợp đồng.
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onViewHistory}
          className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Lịch sử thuê
        </button>
        {isRented && (
          <button
            type="button"
            onClick={onCheckout}
            className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Trả phòng
          </button>
        )}
      </div>
    </div>
  )
}

export default RoomInfoCard