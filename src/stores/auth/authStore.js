import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import RootReducer from './authReducer';

const authStore = configureStore({
    reducer: RootReducer,
});

export default authStore;
