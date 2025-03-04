import { combineReducers, configureStore } from '@reduxjs/toolkit';
import jobPostsReducer from './jobPostsSlice';
import contractorReducer from './contractorsSlice';
import usersReducer from './usersSlice';
import placeReducer from './placeSlice';

export const store = configureStore({
  reducer: combineReducers({
    jobPosts: jobPostsReducer,
    contractors: contractorReducer,
    users: usersReducer,
    place: placeReducer,
  })
});

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
