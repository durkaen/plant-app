import { configureStore } from '@reduxjs/toolkit';
import { plantApi } from './api/plant-api';

export const store = configureStore({
  reducer: {
    [plantApi.reducerPath]: plantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plantApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
