import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice';
import companySlice from '../features/company/companySlice';
import jobSlice from '../features/job/jobSlice';
import applicationReducer from '../features/Application/applicationSlice';

export const store = configureStore({
  reducer: {
    auth:authSlice,
    company:companySlice,
    job:jobSlice,
    application: applicationReducer, 
  },
})

export default store;