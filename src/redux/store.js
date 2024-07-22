import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/auth/authSlice';
import saleSlice from './slice/sale/saleSlice';
import customerSlice from './slice/customer/customerSlice';

export const store = configureStore({
  reducer: {
    authState:authSlice,
    saleState:saleSlice,
    customerState:customerSlice
  },
});
