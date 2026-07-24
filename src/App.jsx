import { Routes, Route } from 'react-router-dom'
import PropertyPage from '~/pages/Property/PropertyPage'
import RoomPage from '~/pages/Room/RoomPage'
import MainLayout from '~/components/layouts/MainLayout'
import RoomDetailPage from '~/pages/Room/RoomDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<PropertyPage />} />
        <Route path='/properties/:propertyId/rooms' element={<RoomPage />} />
        <Route path='/rooms/:roomId' element={<RoomDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App