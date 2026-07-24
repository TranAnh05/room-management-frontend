/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Xác nhận hành động',
  description = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  variant = 'danger',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  isLoading = false,
  hasInput = false,
  inputLabel = 'Ghi chú / Lý do',
  inputPlaceholder = 'Nhập thông tin bổ sung (nếu có)...',
  inputType = 'textarea',
  requiredInput = false
}) {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (isOpen) {
      setInputValue('')
    }
  }, [isOpen])

  if (!isOpen) return null

  // custom styles for different variants
  const variantStyles = {
    danger: {
      iconBg: 'bg-rose-100 text-rose-600',
      buttonBg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    warning: {
      iconBg: 'bg-amber-100 text-amber-600',
      buttonBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    info: {
      iconBg: 'bg-indigo-100 text-indigo-600',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    success: {
      iconBg: 'bg-emerald-100 text-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  }

  const currentVariant = variantStyles[variant] || variantStyles.danger

  const handleSubmit = (e) => {
    e.preventDefault()
    if (requiredInput && !inputValue.trim()) return
    onConfirm(hasInput ? inputValue : undefined)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={!isLoading ? onClose : undefined}
      />
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-100 animate-scaleUp">
          <form onSubmit={handleSubmit} className="p-6 sm:p-7">
            <div className="sm:flex sm:items-start gap-4">
              <div className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${currentVariant.iconBg} sm:mx-0 sm:h-11 sm:w-11`}>
                {currentVariant.icon}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:text-left flex-1">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-6">
                  {title}
                </h3>
                <div className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {typeof description === 'string' ? <p>{description}</p> : description}
                </div>

                {hasInput && (
                  <div className="mt-4 text-left">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {inputLabel} {requiredInput && <span className="text-rose-500">*</span>}
                    </label>
                    {inputType === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={inputPlaceholder}
                        disabled={isLoading}
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all disabled:bg-slate-50"
                      />
                    ) : (
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={inputPlaceholder}
                        disabled={isLoading}
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all disabled:bg-slate-50"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 sm:mt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {cancelText}
              </button>

              <button
                type="submit"
                disabled={isLoading || (requiredInput && !inputValue.trim())}
                className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-sm transition-all cursor-pointer disabled:opacity-50 ${currentVariant.buttonBg}`}
              >
                {isLoading && (
                  <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {confirmText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal