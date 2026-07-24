/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Button from '~/components/common/Button'
import { fetchRoomsByPropertyIdAPI } from '~/apis'
import RoomCard from '~/components/Rooms/RoomCard'
import CreateRoomModal from '~/components/Rooms/CreateRoomModal'
import AddTenantModal from '~/components/Tenants/AddTenantModal'

function RoomPage() {
  const { propertyId } = useParams()
  const navigate = useNavigate()

  const [property, setProperty] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  const loadRoomData = useCallback(() => {
    if (!propertyId) return

    setLoading(true)
    fetchRoomsByPropertyIdAPI(propertyId)
      .then((data) => {
        if (data?.property) setProperty(data.property)
        if (data?.rooms) setRooms(data.rooms)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [propertyId])

  useEffect(() => {
    loadRoomData()
  }, [loadRoomData])

  const handleOpenAddTenant = (room) => {
    setSelectedRoom(room)
    setIsAddTenantModalOpen(true)
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link
          to="/"
          className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Danh sách địa điểm
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate">
          {property?.name}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {property?.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {property?.address}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Tạo phòng
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-slate-200 rounded-md w-1/3"></div>
                <div className="h-6 bg-slate-200 rounded-full w-1/4"></div>
              </div>
              <div className="h-16 bg-slate-200 rounded-xl mb-4"></div>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <div className="h-7 bg-slate-200 rounded-lg w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room._id || room.id}
              room={room}
              onViewDetail={(id) => navigate(`/rooms/${id}`)}
              onAddTenant={() => handleOpenAddTenant(room)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Không tìm thấy phòng trọ nào
          </h3>
        </div>
      )}

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadRoomData}
        propertyId={propertyId}
      />

      <AddTenantModal
        isOpen={isAddTenantModalOpen}
        onClose={() => setIsAddTenantModalOpen(false)}
        onSuccess={loadRoomData}
        room={selectedRoom}
      />
    </>
  )
}

export default RoomPage