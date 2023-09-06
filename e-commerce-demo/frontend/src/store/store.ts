// store.ts
import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import resultsReducer from '../slices/resultsSlice';
import favouritesReducer from '../slices/favouritesSlice';

const rootReducer = combineReducers({
  results: resultsReducer,
  favourites: favouritesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type AppDispatch = typeof store.dispatch;

export default store;