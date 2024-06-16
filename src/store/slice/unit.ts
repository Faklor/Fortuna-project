import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  unit:{
    parts:[]
  }
}

const initialState: CounterState = {
  unit:{
    parts:[]
  }
}

export const counterSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    setUnit: (state:any, action: PayloadAction<CounterState>) => {
      state.unit = action.payload
    }
  }
})

export const { setUnit } = counterSlice.actions

export default counterSlice.reducer

