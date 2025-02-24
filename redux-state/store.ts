import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { productFiltersSlice } from './slices/productFiltersSlice'
import { appBootstrapSlice } from './slices/appBootstrap'
import { cartReducer } from './slices/cart'
import { productDetailPageSlice } from './slices/productDetailPageSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      productFilters: productFiltersSlice.reducer,
      product: productDetailPageSlice.reducer,
      bootstrap: appBootstrapSlice.reducer,
      cart: cartReducer,
    },
    devTools: true,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppStoreGetState = AppStore['getState']
