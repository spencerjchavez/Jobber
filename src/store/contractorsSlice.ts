import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import simpleContactFormProps from 'src/features/forms/SimpleContactForm';
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
const exampleLogos = ['https://media.istockphoto.com/id/1409896319/vector/electric-symbol-design.jpg?s=612x612&w=0&k=20&c=y_iBidJXNbu_cVHRh43z-yChK3JQHM_YBnQj2fVkbp0=', 'https://media.istockphoto.com/id/1144423759/vector/electric-plug-icon-with-cord-stock-vector.jpg?s=612x612&w=0&k=20&c=gaL7s6huiB6tCI-wybq1Q1ui1zH4yoDB1cxUg8Z4aLw=', 'https://i.etsystatic.com/8684670/r/il/aa0978/6079415274/il_570xN.6079415274_knsh.jpg', 'https://cdn.logojoy.com/wp-content/uploads/20220228134805/optimal-electrical-logo.png', 'https://i.etsystatic.com/8684670/r/il/979f7b/5276223942/il_fullxfull.5276223942_nt8d.jpg', 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/10/28210546/fellow-electrical-by-jemstech-designcrowd.png', 'https://static.vecteezy.com/system/resources/thumbnails/001/912/953/small/electrician-holding-lightning-bolt-mascot-circle-black-and-white-vector.jpg', 'https://static.vecteezy.com/system/resources/thumbnails/001/912/953/small/electrician-holding-lightning-bolt-mascot-circle-black-and-white-vector.jpg', 'https://thumbs.dreamstime.com/b/electrician-logo-symbol-template-design-your-company-store-community-whatever-your-needs-electrician-logo-symbol-200948804.jpg'];

// Define the initial state
const initialContractorProps: { [contractorId: number]: ContractorProps} = {};
const initialContractorRatingsProps: { [contractorId: number]: ContractorRatingsProps} = {};
for(let i=0; i<20; i++) {
    const exampleContractorProps: ContractorProps = {
        name: 'Electrician Joe',
        specialty: 'Master Plumber with 40 years of experience',
        jobCategories: ['Plumber', 'construction'],
        serviceArea: {
            location: {
                latitude: 40.2432358 + Math.random() - .5,
                longitude: -111.6552088 + Math.random() - .5,
            },
            radius: 100,
        },
        contractorId: String(i),
        profilePicture: exampleLogos[Math.floor(Math.random() * exampleLogos.length)],
        portfolioImages: ['https://www.shutterstock.com/image-photo/male-plumber-diagnoses-pipes-water-260nw-2358150009.jpg', 'https://wentworthplumbing.ca/wp-content/uploads/2019/02/industrialplumbingpipes-800x450.jpg', 'https://trusteyman.com/wp-content/uploads/2020/07/commercial-plumber-1-1024x683.jpeg', 'https://i.redd.it/bj89ble82m5a1.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYv6qIVUeE4xz4sSJfYTLLzy3BB_HHFegqA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPbZtS_qJrmz1uh7evMzDLT700m1ZNt6YYcw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKz21h6nx_xn_lq_zTTzrULJHgLM3M9H7IA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpy6un9wKIJCsuRaxrkpIJhGt_JXxT0-oqw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpy6un9wKIJCsuRaxrkpIJhGt_JXxT0-oqw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0KTZd0RnLjjTx9tOrGo1caUxjY9I-srVLQ&s'],
        services: ['Plumbing Repair', 'Plumbing Installation', 'Emergency Plumbing'],
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        contactForm: simpleContactFormProps
    }

    const ratings = Array.from({length: 10}).map(() => {
        return {
            stars: Math.floor(Math.random() * 3) + 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.substring(0, Math.random()* 1200),
            contractorId: i,
            authorUserId: 1,
            date: 0
        }
    });
    initialContractorProps[i] = exampleContractorProps;
    initialContractorRatingsProps[i] = {
        contractorId: i,
        ratings,
        avgStars: ratings.reduce((sum, rating) => rating.stars + sum, 0) / (ratings.length ? ratings.length : 1)
    }
}

const exampleCategories = ['Plumber', 'Construction', 'Landscaper', 'Electrician', 'Hvac Technician'];
const initialJobCategoryFilter: { [jobCategory: string]: boolean} = {};
exampleCategories.forEach((category) => {
    initialJobCategoryFilter[category] = false;
})

const initialState: ContractorsState = {
    contractorProps: {}, //initialContractorProps,
    contractorRatings: {}, //initialContractorRatingsProps,
    jobCategoryFilter: {}, //initialJobCategoryFilter,
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