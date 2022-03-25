import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    base: [],
    filtered: [],
    sortCompany: 'all'
  },
  reducers: {
    add: ( state, action ) => {
      return { base: action.payload, filtered: action.payload, sortCompany: ''}
    },
    reload: ( state, action ) => {
      return { ...state, filtered: action.payload}
    },
    filter: ( state, action ) => {
      return { ...state, sortCompany: action.payload}
    }
  }
})

export const { add, reload, filter } = companySlice.actions

export default companySlice.reducer