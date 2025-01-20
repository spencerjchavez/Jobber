import { combineReducers, configureStore } from '@reduxjs/toolkit';
import jobPostsReducer from './jobPostsSlice';
import contractorReducer from './contractorsSlice';
import usersReducer from './usersSlice';
import placeReducer from './placeSlice';
import systemMessageQueueReducer from './systemMessageQueueSlice';

export const store = configureStore({
  reducer: combineReducers({
    jobPosts: jobPostsReducer,
    contractors: contractorReducer,
    users: usersReducer,
    place: placeReducer,
    systemMessageQueue: systemMessageQueueReducer,
  })
});

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
