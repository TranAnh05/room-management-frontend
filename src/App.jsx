import { Routes, Route } from 'react-router-dom'
import PropertyPage from '~/pages/Property/PropertyPage'
import RoomPage from '~/pages/Room/RoomPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<PropertyPage />} />
      <Route path='/properties/:propertyId/rooms' element={<RoomPage />} />
    </Routes>
  )
}

export default App