import React from 'react'
import { formatDate, formatCurrency } from '~/utils/formatters'

function RentalHistoryBlock({ group, index }) {
  const { rentStartDate, rentEndDate, movedOutDate, tenants = [] } = group || {}

  const actualMovedOutDate = movedOutDate || tenants[0]?.movedOutDate

  const isEarlyCheckout = React.useMemo(() => {
    if (!rentEndDate || !actualMovedOutDate) return false
    const endDate = new Date(rentEndDate).getTime()
    const movedOut = new Date(actualMovedOutDate).getTime()
    return movedOut < endDate - 24 * 60 * 60 * 1000
  }, [rentEndDate, actualMovedOutDate])

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden mb-6">
      <div className="bg-slate-50/80 px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {index !== undefined && (
            <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-100 text-indigo-700">
              Đợt {index + 1}
            </span>
          )}

          <div className="flex items-center gap-2 text-slate-800 text-xs sm:text-sm font-bold">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Hợp đồng:</span>
            <span className="text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
              {formatDate(rentStartDate)}
            </span>
            <span className="text-slate-400">➔</span>
            <span className="text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
              {formatDate(rentEndDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {actualMovedOutDate && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
              isEarlyCheckout
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Ngày rời đi: <strong className="font-bold">{formatDate(actualMovedOutDate)}</strong></span>
              {isEarlyCheckout && <span className="text-[10px] bg-amber-200/60 px-1.5 py-1 rounded font-bold uppercase">Sớm hơn hạn</span>}
            </div>
          )}

          <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-200/70 text-slate-700">
            {tenants.length} người ở
          </span>
        </div>

      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tenants.map((tenant) => {
            const isHolder = tenant.deposit > 0

            return (
              <div
                key={tenant._id || tenant.identityCard}
                className={`relative rounded-2xl p-4 border transition-all duration-200 ${
                  isHolder
                    ? 'bg-indigo-50/40 border-indigo-200 shadow-2xs hover:border-indigo-300'
                    : 'bg-slate-50/60 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                {isHolder && (
                  <div className="absolute top-4 right-3 flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-xs">
                    Chủ hợp đồng
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className="pr-16">
                    <h4 className="text-sm font-bold text-slate-900 truncate" title={tenant.fullName}>
                      {tenant.fullName || 'Khách thuê'}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-500 block">
                      {isHolder ? 'Người đại diện thuê' : 'Thành viên ở cùng'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      SĐT:
                    </span>
                    <span className="font-semibold text-slate-800">{tenant.phone}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                      CCCD:
                    </span>
                    <span className="font-semibold text-slate-800 tracking-wider">{tenant.identityCard}</span>
                  </div>

                  {tenant.deposit > 0 && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400 font-medium">Tiền đặt cọc:</span>
                      <span className="font-bold text-indigo-600">{formatCurrency(tenant.deposit)}</span>
                    </div>
                  )}

                  {tenant.movedOutDate && (
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-rose-500 font-medium">Ngày trả phòng:</span>
                      <span className="font-bold text-rose-600">{formatDate(tenant.movedOutDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RentalHistoryBlock