import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JobPostProps from 'src/global-types/JobPostProps';

// Define a type for the slice state
export interface PostsState {
  jobPostProps: Map<number, JobPostProps>
}

// Define the initial state using that type
const initialJobPostProps: Map<number, JobPostProps> = new Map();
for(let i = 0; i < 8; i++) {
  initialJobPostProps.set(i, {
    jobPostId: i,
    postDate: new Date(),
    authorName: 'Jon Doe',
    authorId: 1,
    profilePictureURL: 'https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2013/06/chris_hayes.jpg',
    category: 'Construction',
    title: 'AC Repair Needed on my cental AC',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    images: []
  });
}

const initialState: PostsState = {
  jobPostProps: initialJobPostProps
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