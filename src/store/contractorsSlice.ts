import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ContractorProps from 'src/global-types/ContractorProps';

// Define a type for the slice state
export interface ContractorsState {
    contractorProps: Map<number, ContractorProps>;
    jobCategoryFilter: Map<string, boolean>;
}

// Define the initial state
const initialContractorProps: Map<number, ContractorProps> = new Map();
for(let i=0; i<20; i++) {
    const exampleContractorProps: ContractorProps = {
        name: 'Bob Plumbs A lot',
        specialty: 'Master Plumber with 40 years of experience',
        jobCategories: ['plumbing', 'construction'],
        serviceArea: {
            latitude: 0,
            longitude: 0,
            radius: 40,
        },
        contractorId: i,
        profilePicture: '',
        portfolioImages: []
    }
    initialContractorProps.set(i, exampleContractorProps);
}

const exampleCategories = ['Plumber', 'Construction', 'Landscaper', 'Electrician', 'Hvac Technician'];
const initialJobCategoryFilter: Map<string, boolean> = new Map();
exampleCategories.forEach((category) => {
    initialJobCategoryFilter.set(category, false);
})

const initialState: ContractorsState = {
  contractorProps: initialContractorProps,
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
            state.contractorProps.set(props.contractorId, props);
        })
        },
        deleteContractors: (state, action: PayloadAction<number[]>) => {
        action.payload.forEach((contractorId) => {
            state.contractorProps.delete(contractorId);
        })
        },
        enableCategoryOnFilter: (state, action: PayloadAction<string>) => {
            if (state.jobCategoryFilter.has(action.payload)) {
                state.jobCategoryFilter.set(action.payload, true);
            }
        },
        disableCategoryOnFilter: (state, action: PayloadAction<string>) => {
            if (state.jobCategoryFilter.has(action.payload)) {
                state.jobCategoryFilter.set(action.payload, false);
            }
        },
        toggleCategoryOnFilter: (state, action: PayloadAction<string>) => {
            if (state.jobCategoryFilter.has(action.payload)) {
                state.jobCategoryFilter.set(action.payload, !state.jobCategoryFilter.get(action.payload));
            }
        }
    },
})

export const { addContractors, deleteContractors, enableCategoryOnFilter, disableCategoryOnFilter, toggleCategoryOnFilter } = ContractorsSlice.actions
export default ContractorsSlice.reducer