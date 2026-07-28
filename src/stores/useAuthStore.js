import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      // state
      userInfo: null,

      // Actions
      setUserInfo: (user) => set({ userInfo: user }),

      clearUserInfo: () => set({ userInfo: null })
    }),
    {
      name: 'user-info'
    }
  )
)