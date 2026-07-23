/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '~/components/layouts/MainLayout'
import Button from '~/components/common/Button'
import PropertyCard from '~/components/Property/PropertyCard'
import { fetchPropertiesAPI } from '~/apis'

function PropertyPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetchPropertiesAPI()
      .then((data) => {
        setProperties(data || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSelectProperty = (propertyId) => {
    navigate(`/properties/${propertyId}/rooms`)
  }

  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Địa điểm phòng trọ
          </h1>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => console.log('Mở Modal Tạo Địa Điểm')}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Tạo địa điểm
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs animate-pulse"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
              </div>
              <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-3"></div>
              <div className="h-4 bg-slate-200 rounded-md w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded-md w-2/3 mb-6"></div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="h-4 bg-slate-200 rounded-md w-1/3"></div>
                <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onClick={handleSelectProperty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-2xs">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Chưa có địa điểm nào. Vui lòng dùng nút "Tạo địa điểm" để thêm mới.
          </h3>
        </div>
      )}
    </MainLayout>
  )
}

export default PropertyPage