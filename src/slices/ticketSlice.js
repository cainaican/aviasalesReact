import { createSlice } from "@reduxjs/toolkit";

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    base: [],
    filtered: [],
    origin: '',
    destination: '',
    shownTickets: 5,
    transferFilter: [ null, null, null, null, ],
  },
  reducers: {
    add: (state, action) => {
      return { ...state, base: action.payload, filtered: action.payload}
    },
    reload: (state, action) => {
      return { ...state, filtered: action.payload }
    },
    setFromTo: (state, action) => {
      return { ...state, origin: action.payload.origin, destination: action.payload.destination }
    },
    addShownTickets: (state, action) => {
      return { ...state, shownTickets: action.payload}
    },
    setTransferFilter: ( state, action ) => {
      return { ...state, transferFilter: action.payload}
    }
  }
})

export const { add, reload, setFromTo, addShownTickets, setTransferFilter } = ticketSlice.actions

export default ticketSlice.reducer