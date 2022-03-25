import { createSlice } from "@reduxjs/toolkit";

export const segmentSlice = createSlice({
  name: 'segment',
  initialState: {
    base: [],
    filtered: []
  },
  reducers: {
    add: (state, action) => {
      return { base: action.payload, filtered: action.payload}
    },
    reload: (state, action) => {
      return { ...state, filtered: action.payload }
    },
  }
})

export const { add, reload } = segmentSlice.actions

export default segmentSlice.reducer