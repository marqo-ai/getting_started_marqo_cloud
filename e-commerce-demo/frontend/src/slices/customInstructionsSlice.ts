import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomInstructions } from '../types/types';

const initialState: CustomInstructions = {
  instructions: null,
};

export const customInstructionsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCustomInstructions: (state, action: PayloadAction<string>) => {
      state.instructions = action.payload;
    },
    resetCustomInstructions: (state) => {
      state.instructions = initialState.instructions;
    },
  },
});

export const { setCustomInstructions, resetCustomInstructions } = customInstructionsSlice.actions;

export default customInstructionsSlice.reducer;
