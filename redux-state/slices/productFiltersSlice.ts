import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ProductsFilterData {
  categoryId?: number
  sorting?: string
}

const initialState: ProductsFilterData = {}

export const productFiltersSlice = createSlice({
  name: 'productFilter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<{ categoryId: number }>) => {
      state.categoryId = action.payload.categoryId
    },
    unsetCategory: (state) => {
      state.categoryId = undefined
    },
    setSorting: (state, action: PayloadAction<{ sorting: string }>) => {
      state.sorting = action.payload.sorting
    },
  },
})

export const productFilterActions = productFiltersSlice.actions
