import { toast } from 'react-toastify'
import axiosClient from '~/utils/axiosClient'
import { API_ROOT } from '~/utils/constants'

// APIs for Property
export const fetchPropertiesAPI = async () => {
  const response = await axiosClient.get(`${API_ROOT}/properties`)
  return response.data
}

export const createPropertyAPI = async (data) => {
  const response = await axiosClient.post(`${API_ROOT}/properties`, data)
  toast.success('Tạo địa điểm thành công')
  return response.data
}

// APIs for Room
export const fetchRoomsByPropertyIdAPI = async (propertyId) => {
  const response = await axiosClient.get(`${API_ROOT}/rooms/property/${propertyId}`)
  return response.data
}

export const createRoomAPI = async (data) => {
  const response = await axiosClient.post(`${API_ROOT}/rooms`, data)
  toast.success('Tạo phòng thành công')
  return response.data
}

export const fetchRoomDetailAPI = async (roomId) => {
  const response = await axiosClient.get(`${API_ROOT}/rooms/${roomId}`)
  return response.data
}

export const checkoutRoomAPI = async (roomId) => {
  const response = await axiosClient.put(`${API_ROOT}/tenants/checkout/${roomId}`)
  toast.success('Bạn vừa thực hiện trả phòng thành công!')
  return response.data
}

export const getRoomRentalHistoryAPI = async (roomId, params = {}) => {
  const response = await axiosClient.get(`${API_ROOT}/rooms/${roomId}/rental-history`, {
    params
  })
  return response.data
}

// APIs for Tenant
export const createTenantAPI = async (data) => {
  const response = await axiosClient.post(`${API_ROOT}/tenants`, data)
  toast.success('Thêm người thuê thành công')
  return response.data
}

export const addMembersAPI = async (data) => {
  const response = await axiosClient.post(`${API_ROOT}/tenants/add-members`, data)
  toast.success('Thêm thành viên thành công')
  return response.data
}