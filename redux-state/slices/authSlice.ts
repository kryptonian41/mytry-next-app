import { createAxiosInstance, setDefaultAxios } from 'utils/axios'

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthData {
  token?: string
  isAuthenticated: boolean
  user?: { email: string; first_name: string; last_name: string }
}

const initialState: AuthData = {
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      createAxiosInstance({
        headers: {
          Authorization: `Bearer ${action.payload}`,
        },
      })

      state.isAuthenticated = true
      state.token = action.payload.token

      localStorage.setItem('user-jwt', action.payload.token)
    },
    logout: (state) => {
      localStorage.removeItem('user-jwt')
      setDefaultAxios()
      state = initialState
    },
    setUserData: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user
    },
  },
})

export const authSliceActions = authSlice.actions
