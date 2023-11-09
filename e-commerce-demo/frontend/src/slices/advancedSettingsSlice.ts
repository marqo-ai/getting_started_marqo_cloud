import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdvancedSettings } from '../types/types';

const initialState: AdvancedSettings = {
  autoPrefix: true,
  implicitMoreExpansion: true,
  customPrefix: '',
  limit: 50,
};

export const advancedSettingsSlice = createSlice({
  name: 'advancedSettings',
  initialState,
  reducers: {
    setAutoPrefix: (state, action: PayloadAction<boolean>) => {
      state.autoPrefix = action.payload;
    },
    setImplicitMoreExpansion: (state, action: PayloadAction<boolean>) => {
      state.implicitMoreExpansion = action.payload;
    },
    setCustomPrefix: (state, action: PayloadAction<string>) => {
      state.customPrefix = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    resetAdvancedSettings: (state) => {
      state.autoPrefix = initialState.autoPrefix;
      state.implicitMoreExpansion = initialState.implicitMoreExpansion;
      state.customPrefix = initialState.customPrefix;
      state.limit = initialState.limit;
    },
  },
});

export const {
  setAutoPrefix,
  setCustomPrefix,
  setLimit,
  resetAdvancedSettings,
  setImplicitMoreExpansion,
} = advancedSettingsSlice.actions;

export default advancedSettingsSlice.reducer;
