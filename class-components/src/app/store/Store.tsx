import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../slices/ItemSlice.tsx';
import { itemsApi } from '../service/ItemService';

export const store = configureStore({
  reducer: {
    items: itemReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
