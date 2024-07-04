import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import JobPostProps from 'src/global-types/JobPostProps';

// Define a type for the slice state
interface PostsState {
  jobPostProps: Map<number, JobPostProps>
}

// Define the initial state using that type
const initialState: PostsState = {
  jobPostProps: new Map()
}

export const jobPostsSlice = createSlice({
  name: 'jobPosts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // this will overwrite existing job posts with the same jobPostId
    addJobPosts: (state, action: PayloadAction<JobPostProps[]>) => {
      action.payload.forEach((props) => {
        state.jobPostProps.set(props.jobPostId, props);
      })
    },
    deleteJobPosts: (state, action: PayloadAction<number[]>) => {
      action.payload.forEach((jobPostId) => {
        state.jobPostProps.delete(jobPostId)
      })
    },
  },
})

export const { addJobPosts, deleteJobPosts } = jobPostsSlice.actions
export default jobPostsSlice.reducer