import { combineReducers, configureStore } from '@reduxjs/toolkit';
import jobPostsReducer from './jobPostsSlice';

const store = configureStore({
  reducer: combineReducers({
    jobPosts: jobPostsReducer
  })
});

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch