/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { getRoomBasicAPI, updateRoomAPI } from '~/apis'
import { formatCurrency } from '~/utils/formatters'

const STATUS_MAP = {
  available: { label: 'Phòng trống', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80', dot: 'bg-emerald-500' },
  rented: { label: 'Đang cho thuê', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80', dot: 'bg-indigo-500' }
}

function EditRoomModal({ isOpen, onClose, roomId, onSuccess }) {
  const [fetching, setFetching] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [roomInfo, setRoomInfo] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      price: '',
      area: ''
    }
  })

  const watchPrice = watch('price')

  const fetchRoomDetails = useCallback(() => {
    if (!roomId) return

    setFetching(true)
    getRoomBasicAPI(roomId)
      .then((data) => {
        setRoomInfo(data)
        reset({
          price: data?.price,
          area: data?.area
        })
      })
      .finally(() => {
        setFetching(false)
      })
  }, [roomId, reset])

  useEffect(() => {
    if (isOpen) {
      fetchRoomDetails()
    } else {
      setRoomInfo(null)
    }
  }, [isOpen, fetchRoomDetails])

  // listen for escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !submitting && !fetching) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, submitting, fetching, onClose])

  const onSubmit = (formData) => {
    const newPrice = Number(formData.price)
    const newArea = Number(formData.area)

    if (newPrice === Number(roomInfo?.price) && newArea === Number(roomInfo?.area)) {
      return
    }

    setSubmitting(true)

    const payload = {
      price: newPrice,
      area: newArea
    }

    updateRoomAPI(roomId, payload)
      .then(() => {
        if (onSuccess) onSuccess()
        onClose()
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  if (!isOpen) return null

  const currentStatusConfig = STATUS_MAP[roomInfo?.status] || {
    label: roomInfo?.status,
    bg: 'bg-slate-100 text-slate-700 border-slate-200'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => {
          if (!submitting && !fetching) onClose()
        }}
      />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 transform transition-all overflow-hidden z-10 my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/80 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 shadow-2xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Chỉnh sửa phòng {roomInfo?.roomNumber}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting || fetching}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-200/60 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {fetching ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-16 bg-slate-100 rounded-2xl w-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded-md w-1/3"></div>
                <div className="h-11 bg-slate-100 rounded-xl w-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
                <div className="h-11 bg-slate-100 rounded-xl w-full"></div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <div className="h-10 bg-slate-200 rounded-xl w-20"></div>
                <div className="h-10 bg-slate-200 rounded-xl w-28"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Phòng:</span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-900 shadow-2xs">
                    {roomInfo?.roomNumber}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Trạng thái:</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border ${currentStatusConfig.bg}`}>
                    {currentStatusConfig.label}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-0 md:grid md:grid-cols-12 md:items-center md:gap-4">
                <div className="md:col-span-4 flex items-center justify-between md:flex-col md:items-start gap-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Giá thuê phòng <span className="text-rose-500">*</span>
                  </label>
                </div>

                <div className="md:col-span-8">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Nhập giá thuê..."
                      {...register('price', {
                        required: 'Vui lòng nhập giá thuê phòng',
                        min: { value: 0, message: 'Giá thuê không được nhỏ hơn 0' },
                        valueAsNumber: true
                      })}
                      className={`w-full pl-3.5 pr-3 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-none ${
                        errors.price
                          ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                  </div>

                  {errors.price && (
                    <p className="flex items-center gap-1 text-xs text-rose-500 font-medium mt-1.5">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* FIELD 2: Diện tích (Laptop: nằm trên 1 dòng, Mobile/Tablet: 2 dòng) */}
              <div className="space-y-1.5 md:space-y-0 md:grid md:grid-cols-12 md:items-center md:gap-4">
                <div className="md:col-span-4">
                  <label className="block text-xs font-bold text-slate-700">
                    Diện tích (m²) <span className="text-rose-500">*</span>
                  </label>
                </div>

                <div className="md:col-span-8">
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Nhập diện tích..."
                      {...register('area', {
                        required: 'Vui lòng nhập diện tích phòng',
                        min: { value: 1, message: 'Diện tích phải lớn hơn hoặc bằng 1 m²' },
                        valueAsNumber: true
                      })}
                      className={`w-full pl-3.5 pr-3 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-none ${
                        errors.area
                          ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                  </div>

                  {errors.area && (
                    <p className="flex items-center gap-1 text-xs text-rose-500 font-medium mt-1.5">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.area.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200/80 transition-colors disabled:opacity-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting || !isDirty}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <span>Lưu thay đổi</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditRoomModal