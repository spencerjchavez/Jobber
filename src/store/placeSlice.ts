import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Location from "src/features/locations/Location";

// Define a type for the slice state
export interface PlaceState {
    location?: Location
}

const initialState: PlaceState = { };

export const PlaceSlice = createSlice({
    name: 'place',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<Location>) => {
            state.location = action.payload;
        }
    },
})

export const { setLocation } = PlaceSlice.actions
export default PlaceSlice.reducer