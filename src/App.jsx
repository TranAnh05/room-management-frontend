import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import PropertyPage from '~/pages/Property/PropertyPage'
import RoomPage from '~/pages/Room/RoomPage'
import MainLayout from '~/components/layouts/MainLayout'
import RoomDetailPage from '~/pages/Room/RoomDetailPage'
import RoomRentalHistoryPage from './pages/Room/RoomRentalHistoryPage'
import { useAuthStore } from '~/stores/useAuthStore'
import LoginPage from '~/pages/Auth/LoginPage'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

function App() {
  const userInfo = useAuthStore((state) => state.userInfo)

  return (
    <Routes>
      <Route element={<ProtectedRoute user={userInfo} />}>
        <Route element={<MainLayout />}>
          <Route path='/' element={<PropertyPage />} />
          <Route path='/properties/:propertyId/rooms' element={<RoomPage />} />
          <Route path='/rooms/:roomId' element={<RoomDetailPage />} />
          <Route path="rooms/:roomId/history" element={<RoomRentalHistoryPage />} />
        </Route>
      </Route>

      <Route path='/login' element={<LoginPage />} />

      <Route path='*' element={<Navigate to='/' replace={true} />} />
    </Routes>
  )
}

export default App