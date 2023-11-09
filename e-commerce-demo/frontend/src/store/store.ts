import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import resultsReducer from '../slices/resultsSlice';
import favouritesReducer from '../slices/favouritesSlice';
import searchSettingsSlice from '../slices/searchSettingsSlice';
import customInstructionsSlice from '../slices/customInstructionsSlice';
import searchStyleSlice from '../slices/searchStyleSlice';
import advancedSettingsSlice from '../slices/advancedSettingsSlice';

const rootReducer = combineReducers({
  results: resultsReducer,
  favourites: favouritesReducer,
  searchSettings: searchSettingsSlice,
  customInstructions: customInstructionsSlice,
  searchStyle: searchStyleSlice,
  advancedSettings: advancedSettingsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export default store;
