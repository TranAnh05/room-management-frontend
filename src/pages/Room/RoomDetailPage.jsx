/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchRoomDetailAPI, checkoutRoomAPI } from '~/apis'
import RoomInfoCard from '~/components/Rooms/RoomInfoCard'
import TenantCard from '~/components/Tenants/TenantCard'
import AddTenantModal from '~/components/Tenants/AddTenantModal'
import Button from '~/components/common/Button'
import ConfirmModal from '~/components/common/ConfirmModal'


function RoomDetailPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false)

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadRoomDetail = useCallback(() => {
    if (!roomId) return

    setLoading(true)
    fetchRoomDetailAPI(roomId)
      .then((room) => {
        setRoom(room)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [roomId])

  useEffect(() => {
    loadRoomDetail()
  }, [loadRoomDetail])

  const contractHolder = room?.tenants?.find((tenant) => tenant.isContractHolder)

  const handleOpenCheckoutModal = () => {
    setIsCheckoutModalOpen(true)
  }

  const handleConfirmCheckout = () => {
    setIsSubmitting(true)
    checkoutRoomAPI(roomId)
      .then(() => {
        loadRoomDetail()
      })
      .finally(() => {
        setIsSubmitting(false)
        setIsCheckoutModalOpen(false)
      })
  }

  const handleViewHistory = () => {
    toast.info(`Xem lịch sử thuê phòng ${room?.roomNumber}`)
  }

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Danh sách địa điểm
          </button>
          <span>/</span>
          <Link to={`/properties/${room?.propertyId}/rooms`} className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-medium cursor-pointer">
            {room?.property?.name}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate">
            {loading ? 'Đang tải...' : `Phòng ${room?.roomNumber || ''}`}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded-md w-1/2"></div>
            <div className="h-10 bg-slate-200 rounded-xl w-3/4"></div>
            <div className="h-24 bg-slate-100 rounded-2xl"></div>
            <div className="h-32 bg-slate-100 rounded-2xl"></div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className="h-8 bg-slate-200 rounded-xl w-1/3 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-36 bg-white border border-slate-200 rounded-2xl p-5 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      ) : room ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6">
            <RoomInfoCard
              room={room}
              contractHolder={contractHolder}
              onCheckout={handleOpenCheckoutModal}
              onViewHistory={handleViewHistory}
            />
          </div>

          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Danh sách khách thuê:
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-sm font-bold bg-slate-100 text-slate-600">
                    {room.tenants?.length} người
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => setIsAddTenantModalOpen(true)}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                {room.tenants?.length > 0 ? 'Thêm người ở' : 'Thuê phòng'}
              </Button>
            </div>

            {room.tenants && room.tenants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.tenants.map((tenant) => (
                  <TenantCard key={tenant._id} tenant={tenant} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  Chưa có ai ở phòng này
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Phòng hiện tại đang trống. Bấm nút bên dưới để tạo hợp đồng thuê phòng và thêm thông tin khách ở.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsAddTenantModalOpen(true)}
                >
                  Tạo hợp đồng thuê phòng
                </Button>
              </div>
            )}

          </div>

        </div>
      ) : (
        /* State phòng không tồn tại */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Không tìm thấy thông tin phòng
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Phòng này có thể đã bị xóa hoặc đường dẫn không hợp lệ.
          </p>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Quay lại danh sách
          </Button>
        </div>
      )}

      <AddTenantModal
        isOpen={isAddTenantModalOpen}
        onClose={() => setIsAddTenantModalOpen(false)}
        onSuccess={loadRoomDetail}
        room={room}
      />

      <ConfirmModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleConfirmCheckout}
        title={`Xác nhận trả phòng ${room?.roomNumber}`}
        description="Hành động này sẽ chuyển trạng thái các khách thuê hiện tại sang đã chuyển đi và đưa phòng về trạng thái trống."
        variant="danger"
        confirmText="Xác nhận trả phòng"
        cancelText="Hủy bỏ"
        isLoading={isSubmitting}
      />
    </div>
  )
}

export default RoomDetailPage