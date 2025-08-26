import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import treesApi from './features/trees/treesApi'
import ordersApi from './features/orders/ordersApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [treesApi.reducerPath]:treesApi.reducer,
    [ordersApi.reducerPath]:ordersApi.reducer,

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(treesApi.middleware,ordersApi.middleware),
})