import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from '../interfaces/people.interface';

export interface SelectedState {
  selectedItems: IPeople[];
}

const initialState: SelectedState = {
  selectedItems: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name,
      );
    },
    clearAll(state) {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearAll } = itemSlice.actions;
export default itemSlice.reducer;
