import axios from 'axios'
import { toast } from 'react-toastify'

const axiosClient = axios.create()
axiosClient.defaults.timeout = 1000 * 60 * 10
axiosClient.defaults.withCredentials = true

axiosClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor response
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Xu ly tap trung hien thi thong bao loi tra ve tu api
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }

    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default axiosClient