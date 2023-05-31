import { configureStore } from '@reduxjs/toolkit';

// Slices
import { AuthSlice } from './slices/AuthSlice';

const store = configureStore({
  reducer: {
    authSlice: AuthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
