import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from '../slices/ticketSlice'
import companyReducer from '../slices/companySlice'
import segmentReducer from '../slices/segmentSlice'
import transferReduser from '../slices/transferSlice'
import sortingReducer from '../slices/sortSlices'

export const store = configureStore({
  reducer: {
    tickets: ticketReducer,
    companies: companyReducer,
    segments: segmentReducer,
    transferFilter: transferReduser,
    sorting: sortingReducer,
  },
})
