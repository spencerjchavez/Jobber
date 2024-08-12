import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Location from "src/features/locations/Location";

// Define a type for the slice state
export interface PlaceState {
    placeId?: string
    placeName?: string
    location?: Location
}

const initialState: PlaceState = { };

export const PlaceSlice = createSlice({
    name: 'place',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setPlace: (state, action: PayloadAction<string>) => {
            state.placeId = action.payload;
        },
        setLocation: (state, action: PayloadAction<Location>) => {
            state.location = action.payload;
        },
        setPlaceName: (state, action: PayloadAction<string>) => {
            state.placeName = action.payload;
        }
    },
})

export const { setPlace, setLocation, setPlaceName } = PlaceSlice.actions
export default PlaceSlice.reducer