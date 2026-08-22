/* eslint-disable react-hooks/incompatible-library */
import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import TenantItemForm from './TenantItemForm'
import { createTenantAPI } from '~/apis'
import Button from '~/components/common/Button'

function AddTenantModal({ isOpen, onClose, onSuccess, room }) {
  const roomId = room?._id
  const roomNumber = room?.roomNumber

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      deposit: '',
      rentEndDate: '',
      quantity: 1, // manage the number of tenants to add
      tenants: [
        {
          fullName: '',
          phone: '',
          identityCard: '',
          isContractHolder: true
        }
      ]
    }
  })

  // Use useFieldArray to manage the dynamic list of tenants
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tenants'
  })

  // watch the values of tenants to check who is the contract holder
  const watchTenants = watch('tenants')
  const watchQuantity = watch('quantity')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      reset({
        deposit: '',
        rentEndDate: '',
        quantity: 1,
        tenants: [
          {
            fullName: '',
            phone: '',
            identityCard: '',
            isContractHolder: true
          }
        ]
      })
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, reset])

  if (!isOpen) return null

  const handleClose = () => {
    document.body.style.overflow = 'unset'
    reset()
    onClose()
  }

  const handleQuantityChange = (e) => {
    const newQty = Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
    setValue('quantity', newQty)

    const currentQty = fields.length

    if (newQty > currentQty) {
      // add new empty tenant slots
      for (let i = currentQty; i < newQty; i++) {
        append({
          fullName: '',
          phone: '',
          identityCard: '',
          isContractHolder: false
        })
      }
    } else if (newQty < currentQty) {
      // remove slots from the end to avoid index issues
      for (let i = currentQty - 1; i >= newQty; i--) {
        remove(i)
      }

      // if remove the contract holder, assign the first tenant as the new contract holder
      const hasContractHolder = watchTenants
        ?.slice(0, newQty)
        .some((t) => t?.isContractHolder)

      if (!hasContractHolder && newQty > 0) {
        setValue('tenants.0.isContractHolder', true)
      }
    }
  }

  // handle choosing unique contract holder
  const handleSelectContractHolder = (selectedIndex) => {
    fields.forEach((_, index) => {
      setValue(`tenants.${index}.isContractHolder`, index === selectedIndex)
    })
  }

  const onSubmit = (data) => {
    // convert rentEndDate to timestamp
    const rentEndDateTimestamp = new Date(data.rentEndDate).getTime()

    const payload = {
      roomId: roomId,
      deposit: Number(data.deposit),
      rentEndDate: rentEndDateTimestamp,
      tenants: data.tenants.map((tenant) => ({
        fullName: tenant.fullName.trim(),
        phone: tenant.phone.trim(),
        identityCard: tenant.identityCard.trim(),
        isContractHolder: Boolean(tenant.isContractHolder)
      }))
    }
    createTenantAPI(payload)
      .then(() => {
        handleClose()
        if (onSuccess) {
          onSuccess()
        }
      })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Thêm khách thuê {`- Phòng ${roomNumber}`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Nhập thông tin hợp đồng và danh sách người ở
            </p>
          </div>
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Số lượng người ở
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={watchQuantity}
                    onChange={handleQuantityChange}
                    className="w-full px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-center"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tiền cọc (VNĐ) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="VD: 3000000"
                  className={`w-full px-3.5 py-2 bg-white rounded-xl border text-xs transition-all focus:outline-none ${
                    errors.deposit
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                  {...register('deposit', {
                    required: 'Vui lòng nhập tiền cọc',
                    min: { value: 0, message: 'Tiền cọc không âm' }
                  })}
                />
                {errors.deposit && (
                  <p className="mt-1 text-[11px] text-rose-500 font-medium">
                    {errors.deposit.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ngày hết hợp đồng <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  className={`w-full px-3.5 py-2 bg-white rounded-xl border text-xs transition-all focus:outline-none ${
                    errors.rentEndDate
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                  {...register('rentEndDate', {
                    required: 'Vui lòng chọn ngày hết hợp đồng'
                  })}
                />
                {errors.rentEndDate && (
                  <p className="mt-1 text-[11px] text-rose-500 font-medium">
                    {errors.rentEndDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Danh sách khách lưu trú ({fields.length} người)
                </h4>
                <span className="text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2.5 py-1 rounded-full">
                  Vui lòng chọn 1 người làm Chủ hợp đồng
                </span>
              </div>

              {fields.map((field, index) => (
                <TenantItemForm
                  key={field.id}
                  index={index}
                  register={register}
                  errors={errors.tenants?.[index]}
                  isContractHolder={watchTenants?.[index]?.isContractHolder || false}
                  onSelectContractHolder={handleSelectContractHolder}
                />
              ))}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-end gap-3 shrink-0">
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

export default AddTenantModal