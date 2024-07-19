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
        portfolioImages: ['https://wentworthplumbing.ca/wp-content/uploads/2019/02/industrialplumbingpipes-800x450.jpg', 'https://trusteyman.com/wp-content/uploads/2020/07/commercial-plumber-1-1024x683.jpeg', 'https://i.redd.it/bj89ble82m5a1.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYv6qIVUeE4xz4sSJfYTLLzy3BB_HHFegqA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPbZtS_qJrmz1uh7evMzDLT700m1ZNt6YYcw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKz21h6nx_xn_lq_zTTzrULJHgLM3M9H7IA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpy6un9wKIJCsuRaxrkpIJhGt_JXxT0-oqw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpy6un9wKIJCsuRaxrkpIJhGt_JXxT0-oqw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0KTZd0RnLjjTx9tOrGo1caUxjY9I-srVLQ&s'],
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
    initialContractorProps[i] = exampleContractorProps;
    initialContractorRatingsProps[i] = {
        contractorId: i,
        ratings: Array.from({length: 10}).map(() => {
            return {
                stars: Math.floor(Math.random() * 5) + 1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.substring(0, Math.random()* 1200),
                contractorId: i,
                authorUserId: 0,
                date: 0
            }
        }),
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
        }
    },
})

export const { addContractors, deleteContractors, enableCategoryOnFilter, disableCategoryOnFilter, toggleCategoryOnFilter } = ContractorsSlice.actions
export default ContractorsSlice.reducer