import { createSlice } from "@reduxjs/toolkit";

export const transferSlice = createSlice({
  name: 'transferFilter',
  initialState: [],
  reducers:{
    reloadTransferFilter: (state, action) => {
      state[action.payload.name] = action.payload.value ? action.payload.name : null
      return state
    }
  }
})

export const { reloadTransferFilter } = transferSlice.actions

export default transferSlice.reducer
