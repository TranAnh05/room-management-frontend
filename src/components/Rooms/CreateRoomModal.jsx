import { useForm } from 'react-hook-form'
import { createRoomAPI } from '~/apis'
import Button from '~/components/common/Button'

function CreateRoomModal({ isOpen, onClose, onSuccess, propertyId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      roomNumber: '',
      price: '',
      area: ''
    }
  })

  if (!isOpen) return null

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = (data) => {
    createRoomAPI({
      roomNumber: data.roomNumber.trim(),
      price: Number(data.price),
      area: Number(data.area),
      propertyId: propertyId
    }).then(() => {
      handleClose()
      if (onSuccess) {
        onSuccess()
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Thêm phòng mới</h3>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Tên phòng <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên phòng (VD: A01, A02...)"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                errors.roomNumber
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
              }`}
              {...register('roomNumber', {
                required: 'Vui lòng nhập tên phòng'
              })}
            />
            {errors.roomNumber && (
              <p className="mt-1 text-xs text-rose-500 font-medium">
                {errors.roomNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Giá thuê (VNĐ) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Nhập giá (VD: 3000000)"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                errors.price
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
              }`}
              {...register('price', {
                required: 'Vui lòng nhập giá phòng',
                min: { value: 1, message: 'Giá phòng phải lớn hơn 0' }
              })}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-rose-500 font-medium">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Diện tích (m²) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Nhập diện tích (VD: 10, 15...)"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                errors.area
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
              }`}
              {...register('area', {
                required: 'Vui lòng nhập diện tích phòng',
                min: { value: 1, message: 'Diện tích phải lớn hơn 0' }
              })}
            />
            {errors.area && (
              <p className="mt-1 text-xs text-rose-500 font-medium">
                {errors.area.message}
              </p>
            )}
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Tạo
            </Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default CreateRoomModal