import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: 'sorting',
  initialState: 'chipest',
  reducers:{
    reloadSort: (state, action) => {
      return action.payload
    }
  }
})

export const { reloadSort } = sortSlice.actions

export default sortSlice.reducer