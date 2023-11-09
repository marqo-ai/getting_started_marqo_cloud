import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchSettings } from '../types/types';

const initialState: SearchSettings = {
  queryWeight: 1.0,
  posQueryWeight: 0.6,
  negQueryWeight: -1.1,
  customInstructionsWeight: 0.3,
  totalFavouriteWeight: 0.3,
};

export const searchSettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setQueryWeight: (state, action: PayloadAction<number>) => {
      state.queryWeight = action.payload;
    },
    setPosQueryWeight: (state, action: PayloadAction<number>) => {
      state.posQueryWeight = action.payload;
    },
    setNegQueryWeight: (state, action: PayloadAction<number>) => {
      state.negQueryWeight = action.payload;
    },
    setTotalFavouriteWeight: (state, action: PayloadAction<number>) => {
      state.totalFavouriteWeight = action.payload;
    },
    setCustomInstructionsWeight: (state, action: PayloadAction<number>) => {
      state.customInstructionsWeight = action.payload;
    },
    resetSearchSettings: (state) => {
      state.queryWeight = initialState.queryWeight;
      state.posQueryWeight = initialState.posQueryWeight;
      state.negQueryWeight = initialState.negQueryWeight;
      state.customInstructionsWeight = initialState.customInstructionsWeight;
      state.totalFavouriteWeight = initialState.totalFavouriteWeight;
    },
  },
});

export const {
  setQueryWeight,
  setPosQueryWeight,
  setNegQueryWeight,
  setCustomInstructionsWeight,
  setTotalFavouriteWeight,
  resetSearchSettings,
} = searchSettingsSlice.actions;

export default searchSettingsSlice.reducer;
