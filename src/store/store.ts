import { configureStore } from '@reduxjs/toolkit'
//--splice----
import unit from './slice/unit'
import order from './slice/order'

export const makeStore = () => {
  return configureStore({
    reducer: {
      unit: unit,
      selectOrder:order,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']