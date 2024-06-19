import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface CounterState {
    search:string
}

const initialState: CounterState = {
    search:""
}

export const counterSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state:any, action: PayloadAction<CounterState>) => {
      state.search = action.payload
    }
    
  }
})

export const { setSearch } = counterSlice.actions

export default counterSlice.reducer
