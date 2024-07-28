import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPeople} from "../interfaces/people.interface";
import {IFilm} from "../interfaces/films.interface";
import {IStarships} from "../interfaces/starships.interface";

interface ItemState {
  items: (IPeople | IFilm | IStarships)[];
}

const initialState: ItemState = {
  items: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IPeople | IFilm | IStarships>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<IPeople | IFilm | IStarships>) {
      const identifier = 'name' in action.payload ? action.payload.name : action.payload.title;
      state.items = state.items.filter(item =>
          'name' in item ? item.name !== identifier : item.title !== identifier
      );
    },
    clearAll(state) {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearAll } = itemSlice.actions;
export default itemSlice.reducer;
