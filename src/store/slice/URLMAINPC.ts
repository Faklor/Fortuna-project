import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    URLMAINPC:string
}

const initialState: CounterState = {
    URLMAINPC:'localhost' 
}
//192.168.0.102

export const counterSlice = createSlice({
  name: 'URLMAINPC',
  initialState,
  reducers: {
    setURL: (state:any, action: PayloadAction<CounterState>) => {
      state.unit = action.payload
    }
  }
})

export const { setURL } = counterSlice.actions

export default counterSlice.reducer