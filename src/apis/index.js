import axiosClient from '~/utils/axiosClient'
import { API_ROOT } from '~/utils/constants'

export const fetchPropertiesAPI = async () => {
  const response = await axiosClient.get(`${API_ROOT}/properties`)
  return response.data
}