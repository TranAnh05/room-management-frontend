import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { addMembersAPI } from '~/apis'

const DEFAULT_MEMBER = { fullName: '', phone: '', identityCard: '' }

function AddMemberModal({ isOpen, onClose, onSuccess, room }) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      tenants: [DEFAULT_MEMBER]
    },
    mode: 'onTouched'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tenants'
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        tenants: [DEFAULT_MEMBER]
      })
    }
  }, [isOpen, reset])

  if (!isOpen) return null

  const onSubmit = (data) => {
    setLoading(true)
    const payload = {
      roomId: room?._id,
      tenants: data.tenants.map((t) => ({
        fullName: t.fullName.trim(),
        phone: t.phone.trim(),
        identityCard: t.identityCard.trim()
      }))
    }

    addMembersAPI(payload)
      .then(() => {
        onSuccess()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={!loading ? onClose : undefined}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-3xl border border-slate-100 animate-scaleUp">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block mb-0.5">
                Thêm khách lưu trú
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Phòng {room?.roomNumber || ''}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-6">
            <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-4">
              {fields.map((field, index) => {
                const memberErrors = errors?.tenants?.[index]
                return (
                  <div
                    key={field.id}
                    className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 transition-all hover:border-slate-300 relative group"
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/50">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px]">
                          {index + 1}
                        </span>
                        Thành viên {index + 1}
                      </span>

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          disabled={loading}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                          title="Xóa thành viên này"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Họ và tên <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Nguyễn Văn A"
                          disabled={loading}
                          {...register(`tenants.${index}.fullName`, {
                            required: 'Vui lòng nhập họ tên'
                          })}
                          className={`w-full rounded-xl border bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all disabled:bg-slate-100 ${
                            memberErrors?.fullName
                              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                              : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                          }`}
                        />
                        {memberErrors?.fullName && (
                          <span className="text-[10px] font-medium text-rose-500 mt-1 block">
                            {memberErrors.fullName.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Số điện thoại <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="0987654321"
                          disabled={loading}
                          {...register(`tenants.${index}.phone`, {
                            required: 'Vui lòng nhập SĐT',
                            pattern: {
                              value: /^(0[3|5|7|8|9])+([0-9]{8})\b$/,
                              message: 'SĐT không hợp lệ'
                            }
                          })}
                          className={`w-full rounded-xl border bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all disabled:bg-slate-100 ${
                            memberErrors?.phone
                              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                              : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                          }`}
                        />
                        {memberErrors?.phone && (
                          <span className="text-[10px] font-medium text-rose-500 mt-1 block">
                            {memberErrors.phone.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          CCCD / CMND <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="012345678901"
                          disabled={loading}
                          {...register(`tenants.${index}.identityCard`, {
                            required: 'Vui lòng nhập CCCD',
                            minLength: {
                              value: 9,
                              message: 'Tối thiểu 9 ký tự'
                            },
                            maxLength: {
                              value: 12,
                              message: 'Tối đa 12 ký tự'
                            }
                          })}
                          className={`w-full rounded-xl border bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all disabled:bg-slate-100 ${
                            memberErrors?.identityCard
                              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                              : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                          }`}
                        />
                        {memberErrors?.identityCard && (
                          <span className="text-[10px] font-medium text-rose-500 mt-1 block">
                            {memberErrors.identityCard.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => append(DEFAULT_MEMBER)}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm một người khác
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading && (
                  <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                Lưu danh sách ({fields.length})
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddMemberModal