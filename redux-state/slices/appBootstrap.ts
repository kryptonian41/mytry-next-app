import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const AppInitializationState = {
  IDLE: 'idle',
  IN_PROGRESS: 'inprogress',
  COMPLETE: 'complete',
} as const

export interface AppBootstrapData {
  initializing: (typeof AppInitializationState)[keyof typeof AppInitializationState]
}

const initialState: AppBootstrapData = {
  initializing: AppInitializationState.IDLE,
}

export const appBootstrapSlice = createSlice({
  name: 'productFilter',
  initialState,
  reducers: {
    startInitialization: (state) => {
      state.initializing = AppInitializationState.IN_PROGRESS
    },
    completeInitialization: (state) => {
      state.initializing = AppInitializationState.COMPLETE
    },
    resetInitialization: (state) => {
      state.initializing = AppInitializationState.IDLE
    },
  },
})

export const appBootstrapSliceActions = appBootstrapSlice.actions
