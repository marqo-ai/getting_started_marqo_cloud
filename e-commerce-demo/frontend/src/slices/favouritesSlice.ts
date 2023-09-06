import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouritesState {
  terms: string[];
}

const initialState: FavouritesState = {
  terms: [],
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>) => {
      if (!state.terms.includes(action.payload)) {
        state.terms.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.terms = state.terms.filter((term) => term !== action.payload);
    },
    clearFavourites: (state) => {
      state.terms = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
