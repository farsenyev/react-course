import { configureStore } from '@reduxjs/toolkit';
import { itemsApi } from '../../app/service/ItemService';

export const setupApiStore = () => {
    const store = configureStore({
        reducer: { [itemsApi.reducerPath]: itemsApi.reducer },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(itemsApi.middleware),
    });

    return store;
};

export type SetupApiStore = ReturnType<typeof setupApiStore>;