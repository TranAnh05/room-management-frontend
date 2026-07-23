function TenantItemForm({
  index,
  register,
  errors = {},
  isContractHolder,
  onSelectContractHolder
}) {
  return (
    <div
      className={`relative rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
        isContractHolder
          ? 'bg-indigo-50/30 border-indigo-200 shadow-xs ring-1 ring-indigo-500/10'
          : 'bg-white border-slate-200/90 hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
            #{index + 1}
          </span>
          <h4 className="text-sm font-bold text-slate-800 tracking-tight">
            Thông tin khách thuê {index + 1}
          </h4>
        </div>

        <button
          type="button"
          onClick={() => onSelectContractHolder(index)}
          className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
            isContractHolder
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
              : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
              isContractHolder ? 'bg-white text-indigo-600' : 'border-2 border-slate-400 bg-white group-hover:border-slate-600'
            }`}
          >
            {isContractHolder && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-scaleIn"></span>
            )}
          </span>
          <span>Đứng tên hợp đồng</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Họ và tên <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="VD: Võ Văn Hai"
            className={`w-full px-3.5 py-2 bg-white rounded-xl border text-xs text-slate-900 transition-all focus:outline-none ${
              errors?.fullName
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:bg-rose-50/10'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
            }`}
            {...register(`tenants.${index}.fullName`, {
              required: 'Vui lòng nhập họ và tên',
              minLength: { value: 2, message: 'Tên ít nhất 2 ký tự' }
            })}
          />
          {errors?.fullName && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Số điện thoại <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="VD: 0912345678"
            className={`w-full px-3.5 py-2 bg-white rounded-xl border text-xs text-slate-900 transition-all focus:outline-none ${
              errors?.phone
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:bg-rose-50/10'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
            }`}
            {...register(`tenants.${index}.phone`, {
              required: 'Vui lòng nhập số điện thoại',
              pattern: {
                value: /^[0-9]{9,11}$/,
                message: 'Số điện thoại không hợp lệ (9-11 số)'
              }
            })}
          />
          {errors?.phone && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Căn cước công dân<span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="VD: 052305010259 (12 chữ số)"
            className={`w-full px-3.5 py-2 bg-white rounded-xl border text-xs text-slate-900 transition-all focus:outline-none ${
              errors?.identityCard
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:bg-rose-50/10'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
            }`}
            {...register(`tenants.${index}.identityCard`, {
              required: 'Vui lòng nhập số CCCD',
              pattern: {
                value: /^[0-9]{9,12}$/,
                message: 'CCCD phải từ 9 đến 12 chữ số'
              }
            })}
          />
          {errors?.identityCard && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">
              {errors.identityCard.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TenantItemForm