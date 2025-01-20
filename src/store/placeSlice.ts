import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Coordinate from "src/features/locations/Coordinate";

// Define a type for the slice state
export interface PlaceState {
    clientCoordinate?: Coordinate
}

const initialState: PlaceState = { };

export const PlaceSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        setCoordinate: (state, action: PayloadAction<Coordinate>) => {
            state.clientCoordinate = action.payload;
        }
    },
})

export const { setCoordinate } = PlaceSlice.actions
export default PlaceSlice.reducer