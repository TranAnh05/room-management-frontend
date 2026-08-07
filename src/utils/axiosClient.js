import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuthStore } from '~/stores/useAuthStore'

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
  async (error) => {
    const status = error.response?.status
    const originalRequest = error.config

    const isAuthRequest = originalRequest.url?.includes('/users/logout')
    if ((status === 401 || status === 410) && !isAuthRequest) {
      try {
        await axiosClient.delete('/users/logout')
      // eslint-disable-next-line no-empty
      } catch {
      } finally {
        useAuthStore.getState().clearUserInfo()
        window.location.href = '/login'
      }

      return Promise.reject(error)
    }

    // Xu ly tap trung hien thi thong bao loi tra ve tu api
    let errorMessage = error?.message
    if (error.response?.data && typeof error.response?.data === 'object' ) {
      errorMessage = error.response?.data?.message || errorMessage
    } else {
      errorMessage = 'Có lỗi xảy ra, vui lòng thử lại sau.'
    }

    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default axiosClient