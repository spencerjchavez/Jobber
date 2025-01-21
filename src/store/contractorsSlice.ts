import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Coordinate from 'src/features/locations/Coordinate';
import ContractorProps from 'src/global-types/ContractorProps';
import ContractorRating from 'src/global-types/ContractorRating';
import ContractorRatingsProps from 'src/global-types/ContractorRatingsProps';
import { fetchContractorsThunk } from 'src/thunks/ContractorsThunk';

// Define a type for the slice state
export interface ContractorsState {
    contractorProps: { [contractorId: string]: ContractorProps};
    contractorRatings: Record<string, ContractorRatingsProps>;
    jobCategoryFilter: { [jobCategory: string]: boolean};
    fetchedLocations: Coordinate[];

}

const exampleCategories = ['Plumber', 'Construction', 'Landscaper', 'Electrician', 'Hvac Technician'];
const initialJobCategoryFilter: { [jobCategory: string]: boolean} = {};
exampleCategories.forEach((category) => {
    initialJobCategoryFilter[category] = false;
})

const initialState: ContractorsState = {
    contractorProps: {},
    contractorRatings: {}, 
    jobCategoryFilter: {}, 
    fetchedLocations: []
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
                if (!state.contractorRatings[contractorRating.contractorId]) {
                    state.contractorRatings[contractorRating.contractorId] = {
                        contractorId: contractorRating.contractorId,
                        ratings: [],
                        avgStars: 0
                    }
                }
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
        },
        addFetchedLocation: (state, action: PayloadAction<Coordinate>) => {
            state.fetchedLocations.push(action.payload);
        },
        removeFetchedLocation: (state, action: PayloadAction<Coordinate>) => {
            state.fetchedLocations.findIndex((val) => val === action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContractorsThunk.fulfilled, (state, action) => {
            
        })
        .addCase(fetchContractorsThunk.pending, (state, action) => {

        })
        .addCase(fetchContractorsThunk.rejected, (state, action) => {
          
        });
    },
})

export const { addContractors, deleteContractors, enableCategoryOnFilter, disableCategoryOnFilter, toggleCategoryOnFilter, addFetchedLocation, removeFetchedLocation } = ContractorsSlice.actions
export default ContractorsSlice.reducer