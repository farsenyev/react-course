import React from 'react';
import { Provider } from 'react-redux';
import {configureStore, Store} from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import {FlyoutComponent} from '../app/components/flyout/FlyoutComponent';
import itemReducer from '../app/slices/ItemSlice';
import {itemsApi} from "../app/service/ItemService";
import {RootState} from "../app/store/Store";

describe('FlyoutComponent', () => {
    let store: Store<RootState>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                items: itemReducer,
                [itemsApi.reducerPath]: itemsApi.reducer,
            },
        });

        // Мок функции URL.createObjectURL
        global.URL.createObjectURL = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('triggers download when download button is clicked', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <FlyoutComponent />
            </Provider>
        );

        fireEvent.click(getByText('Download'));

        expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    it('clears all items when unselect all button is clicked', () => {
        const { getByText } = render(
            <Provider store={store}>
                <FlyoutComponent />
            </Provider>
        );

        fireEvent.click(getByText('Unselect all'));

        expect(store.getState().items.items).toHaveLength(0);
    });
});
