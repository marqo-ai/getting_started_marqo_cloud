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
  },
});

export const { setSearchStyle } = searchStyleSlice.actions;

export default searchStyleSlice.reducer;
