import { combineReducers, configureStore } from '@reduxjs/toolkit';
import jobPostsReducer from './jobPostsSlice';

export const store = configureStore({
  reducer: combineReducers({
    jobPosts: jobPostsReducer
  })
});

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
