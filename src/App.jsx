import { Routes, Route } from 'react-router-dom'
import PropertyPage from '~/pages/Property/PropertyPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<PropertyPage />} />
    </Routes>
  )
}

export default App