import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JobPostProps from 'src/global-types/JobPostProps';

// Define a type for the slice state
export interface PostsState {
  jobPostProps: Map<number, JobPostProps>
  jobCategoryFilter: number[]
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
    images: ['https://callapollo.com/wp-content/uploads/db22d679-771b-433a-ac3b-518df7381412.jpg', 'https://www.cielowigle.com/wp-content/uploads/2021/05/AC-condenser.jpg']
  });
}

const initialState: PostsState = {
  jobPostProps: initialJobPostProps,
  jobCategoryFilter: []
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
        state.jobPostProps.delete(jobPostId);
      })
    },
    addCategoryToFilter: (state, action: PayloadAction<number>) => {
      state.jobCategoryFilter.push(action.payload);
    },
    removeCategoryFromFilter: (state, action: PayloadAction<number>) => {
      
    }
  },
})

export const { addJobPosts, deleteJobPosts } = jobPostsSlice.actions
export default jobPostsSlice.reducer