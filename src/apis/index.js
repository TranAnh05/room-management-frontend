import { toast } from 'react-toastify'
import axiosClient from '~/utils/axiosClient'
import { API_ROOT } from '~/utils/constants'

export const fetchPropertiesAPI = async () => {
  const response = await axiosClient.get(`${API_ROOT}/properties`)
  return response.data
}

export const createPropertyAPI = async (data) => {
  const response = await axiosClient.post(`${API_ROOT}/properties`, data)
  toast.success('Tạo địa điểm thành công')
  return response.data
}