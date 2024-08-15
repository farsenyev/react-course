import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import countriesReducer from './countriesSlice';

const store = configureStore({
    reducer: {
        forms: formReducer,
        countries: countriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
