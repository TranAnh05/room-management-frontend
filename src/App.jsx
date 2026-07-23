import { Routes, Route } from 'react-router-dom'
import PropertyPage from '~/pages/Property/PropertyPage'
import RoomPage from '~/pages/Room/RoomPage'
import MainLayout from '~/components/layouts/MainLayout'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<PropertyPage />} />
        <Route path='/properties/:propertyId/rooms' element={<RoomPage />} />
      </Route>
    </Routes>
  )
}

export default App