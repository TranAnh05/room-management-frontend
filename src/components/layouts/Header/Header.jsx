import { useNavigate } from 'react-router-dom'
import { logoutAPI } from '~/apis'
import { useAuthStore } from '~/stores/useAuthStore'
import Button from '~/components/common/Button'
import { toast } from 'react-toastify'

function Header() {
  const navigate = useNavigate()
  const clearUserInfo = useAuthStore((state) => state.clearUserInfo)

  const handleLogout = () => {
    logoutAPI()
      .then(() => {
        toast.success('Đăng xuất thành công!')
        clearUserInfo()
        navigate('/login')
      })
      .catch(() => {
        toast.success('Đăng xuất thành công!')
        clearUserInfo()
        navigate('/login')
      })
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* 1. Brand Logo & Name */}
        <div className="flex items-center gap-3">
          {/* Logo Badge Icon */}
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight tracking-tight">
              Room Management
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Hệ thống quản lý phòng trọ
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={handleLogout}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          }
        >
          Đăng xuất
        </Button>
      </div>
    </header>
  )
}

export default Header