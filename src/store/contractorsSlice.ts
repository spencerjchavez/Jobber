import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ContractorProps from 'src/global-types/ContractorProps';
import ContractorRating from 'src/global-types/ContractorRating';
import ContractorRatingsProps from 'src/global-types/ContractorRatingsProps';

// Define a type for the slice state
export interface ContractorsState {
    contractorProps: { [contractorId: number]: ContractorProps};
    contractorRatings: Record<number, ContractorRatingsProps>;
    jobCategoryFilter: { [jobCategory: string]: boolean};
}

// Define the initial state
const initialContractorProps: { [contractorId: number]: ContractorProps} = {};
const initialContractorRatingsProps: { [contractorId: number]: ContractorRatingsProps} = {};
for(let i=0; i<20; i++) {
    const exampleContractorProps: ContractorProps = {
        name: 'Plumber Wannabe',
        specialty: 'Master Plumber with 40 years of experience',
        jobCategories: ['plumbing', 'construction'],
        serviceArea: {
            latitude: 0,
            longitude: 0,
            radius: 40,
        },
        contractorId: i,
        profilePicture: 'https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/3/3b/33b9e530-5c2c-54ea-9de9-52ed38678502/55836d201d850.image.jpg',
        portfolioImages: []
    }
    initialContractorProps[i] = exampleContractorProps;
    initialContractorRatingsProps[i] = {
        contractorId: i,
        ratings: [],
        avgStars: 5
    }
}

const exampleCategories = ['Plumber', 'Construction', 'Landscaper', 'Electrician', 'Hvac Technician'];
const initialJobCategoryFilter: { [jobCategory: string]: boolean} = {};
exampleCategories.forEach((category) => {
    initialJobCategoryFilter[category] = false;
})

const initialState: ContractorsState = {
  contractorProps: initialContractorProps,
  contractorRatings: initialContractorRatingsProps,
  jobCategoryFilter: initialJobCategoryFilter
}

export const ContractorsSlice = createSlice({
    name: 'contractors',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // this will overwrite existing job posts with the same jobPostId
        addContractors: (state, action: PayloadAction<ContractorProps[]>) => {
        action.payload.forEach((props) => {
            state.contractorProps[props.contractorId] = props;
        })
        },
        deleteContractors: (state, action: PayloadAction<number[]>) => {
        action.payload.forEach((contractorId) => {
            delete state.contractorProps[contractorId];
        })
        },
        addRatings: (state, action: PayloadAction<ContractorRating[]>) => {
            action.payload.forEach((contractorRating) => {
                const {avgStars, ratings} = state.contractorRatings[contractorRating.contractorId];
                state.contractorRatings[contractorRating.contractorId].avgStars = (avgStars * ratings.length + contractorRating.stars) / (ratings.length + 1);
                state.contractorRatings[contractorRating.contractorId].ratings.push(contractorRating);
            })
        },
        enableCategoryOnFilter: (state, action: PayloadAction<string>) => {
            if (state.jobCategoryFilter[action.payload] != null) {
                state.jobCategoryFilter[action.payload] = true;
            }
        },
        disableCategoryOnFilter: (state, action: PayloadAction<string>) => {
            if (state.jobCategoryFilter[action.payload] != null) {
                state.jobCategoryFilter[action.payload]  = false;
            }
        },
        toggleCategoryOnFilter: (state, action: PayloadAction<string>) => {
            if (state.jobCategoryFilter[action.payload] != null) {
                state.jobCategoryFilter[action.payload] = !state.jobCategoryFilter[action.payload];
            }
        }
    },
})

export const { addContractors, deleteContractors, enableCategoryOnFilter, disableCategoryOnFilter, toggleCategoryOnFilter } = ContractorsSlice.actions
export default ContractorsSlice.reducer