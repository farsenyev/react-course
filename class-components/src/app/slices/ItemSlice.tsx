import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPeople} from "../interfaces/people.interface";

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
    addItem(state, action: PayloadAction<IPeople>) {
      state.items.push({
        id: action.payload.id,
        category: action.payload.category.split('?')[0],
      });
      console.log('added')
    },
    removeItem(state, action: PayloadAction<IPeople>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      console.log('removed')
    },
  },
});

export const { addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
