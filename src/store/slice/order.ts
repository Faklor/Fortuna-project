import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface CounterState {
    order:object
}

const initialState: CounterState = {
    order:{}
}

export const counterSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<CounterState>) => {
      state.order = action.payload
    }, 
    updateOrder: (state, action: PayloadAction<CounterState>) =>{ 
      let min = 1
      
      
      if(String(action.payload.method) === 'up'){
        
       
        if(state.order.count  === action.payload.maxC){
          state.order.count = state.order.count  
        }
        else{
          state.order.count++
        }
        
        
      }
      else{
        if(state.order.count === min){
          state.order.count = state.order.count
        }
        else{
          state.order.count--
        }
       

        
        
      }
        
    }
  }
})

export const { setOrder,updateOrder } = counterSlice.actions

export default counterSlice.reducer
