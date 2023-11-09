import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchStyleState {
  style: string | null;
}

const initialState: SearchStyleState = {
  style: null,
};

export const searchStyleSlice = createSlice({
  name: 'searchStyle',
  initialState,
  reducers: {
    setSearchStyle: (state, action: PayloadAction<string | null>) => {
      state.style = action.payload;
    },
    resetSearchStyle: (state) => {
      state.style = null;
    },
  },
});

export const { setSearchStyle, resetSearchStyle } = searchStyleSlice.actions;

export default searchStyleSlice.reducer;
