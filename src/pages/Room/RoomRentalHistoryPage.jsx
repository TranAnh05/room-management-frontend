/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from 'react'
import { getRoomRentalHistoryAPI } from '~/apis'
import RentalHistoryBlock from '~/components/Rooms/RentalHistoryBlock'
import { useParams, useNavigate } from 'react-router-dom'
import { formatCurrency } from '~/utils/formatters'
import Pagination from '~/components/common/Pagination'
import ScrollSection from '~/components/common/ScrollSection'

function RoomRentalHistoryPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()

  const [room, setRoom] = useState(null)
  const [history, setHistory] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 3,
    totalItems: 0,
    totalPages: 1
  })

  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchRentalHistory = useCallback((page) => {
    if (!roomId) return

    setLoading(true)
    getRoomRentalHistoryAPI(roomId, { page: page, limit: 2 })
      .then((data) => {
        setRoom(data.room)
        setHistory(data.history)
        if (data.pagination) {
          setPagination(data.pagination)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [roomId])

  useEffect(() => {
    fetchRentalHistory(currentPage)
  }, [fetchRentalHistory, currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16 animate-fadeIn">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
          </button>
          <span>/</span>
          <span className="text-slate-400 font-normal">Chi tiết phòng</span>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate">
            Lịch sử thuê phòng {room?.roomNumber}
          </span>
        </div>
      </div>

      <div className="bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl shadow-indigo-950/10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold uppercase tracking-wider mb-3 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              Lịch sử lưu trú
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Phòng trọ {room?.roomNumber}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-1 max-w-xl">
              Tra cứu danh sách các lượt thuê, khoảng thời gian ở và thông tin chi tiết từng khách lưu trú đã từng ở tại phòng này.
            </p>
          </div>

          {room && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 self-start md:self-auto">
              <div className="px-3 py-1 text-center">
                <span className="text-[10px] uppercase font-bold text-indigo-200 block">Giá thuê hiện tại</span>
                <span className="text-base sm:text-lg font-extrabold text-white">
                  {formatCurrency(room.price)}
                </span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="px-3 py-1 text-center">
                <span className="text-[10px] uppercase font-bold text-indigo-200 block">Diện tích</span>
                <span className="text-base sm:text-lg font-extrabold text-white">
                  {room.area} m²
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 animate-pulse space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="h-6 bg-slate-200 rounded-lg w-1/3" />
                <div className="h-6 bg-slate-200 rounded-lg w-1/4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-32 bg-slate-100 rounded-2xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : history.length > 0 ? (
        <div className="space-y-6">
          {history.map((sessionGroup, index) => {
            const sessionIndex = (pagination.page - 1) * pagination.limit + index
            return (
              <ScrollSection>
                <RentalHistoryBlock
                  key={`${sessionGroup.rentEndDate}-${index}`}
                  group={sessionGroup}
                  index={sessionIndex}
                />
              </ScrollSection>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-14 text-center my-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
            Chưa có lịch sử thuê
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6">
            Phòng này chưa từng phát sinh giao dịch trả phòng hoặc chưa có dữ liệu lịch sử lưu trú trước đây.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Quay lại thông tin phòng
          </button>
        </div>
      )}

      {!loading && pagination.totalPages > 1 && (
        <div className="mt-8 pt-4 border-t border-slate-200/80">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default RoomRentalHistoryPage