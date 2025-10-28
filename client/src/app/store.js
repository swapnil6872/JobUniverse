import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice';
import companySlice from '../features/company/companySlice';
import jobSlice from '../features/job/jobSlice';

export const store = configureStore({
  reducer: {
    auth:authSlice,
    company:companySlice,
    job:jobSlice,
  },
})

export default store;