function TenantCard({ tenant, onRemove }) {
  if (!tenant) return null

  const { fullName, phone, identityCard, isContractHolder } = tenant

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 ${
        isContractHolder
          ? 'bg-indigo-50/40 border-indigo-200 shadow-2xs'
          : 'bg-white border-slate-200/90 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-2xs ${
              isContractHolder
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {fullName ? fullName.charAt(0).toUpperCase() : 'K'}
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
              {fullName || 'Chưa cập nhật tên'}
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Khách lưu trú
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isContractHolder ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Chủ hợp đồng
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onRemove && onRemove(tenant)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Xóa thành viên khỏi phòng"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2 text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">SĐT</span>
            <span className="font-semibold text-slate-800">{phone || 'N/A'}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6" />
          </svg>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">CCCD / CMND</span>
            <span className="font-semibold text-slate-800">{identityCard || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TenantCard