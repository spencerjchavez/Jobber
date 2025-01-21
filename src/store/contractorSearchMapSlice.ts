import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import Coordinate from "src/features/locations/Coordinate";
import ContractorProps from "src/global-types/ContractorProps";

// Define a type for the slice state
export interface ContractorSearchMapState {
    selectedContractorId?: string;
    zoom: number;
    center: Coordinate;
}

const initialState: ContractorSearchMapState = {
    selectedContractorId: undefined,
    zoom: 10,
    center: {
        latitude: 0,
        longitude: 0,
    }
}

export const ContractorSearchMapState = createSlice({
    name: 'contractorSearchMap',
    initialState,
    reducers: {
        selectContractor: (state, action: PayloadAction<ContractorProps>) => {
            state.selectedContractorId = action.payload.contractorId;
            state.center = { latitude: action.payload.serviceArea.location.latitude, longitude: action.payload.serviceArea.location.longitude };
            state.zoom = 5;
        },
        handleCameraChanged: (state, action: PayloadAction<MapCameraChangedEvent>) => {
            state.center = {
                latitude: action.payload.detail.center.lat, 
                longitude: action.payload.detail.center.lng
            };
            state.zoom = action.payload.detail.zoom;
        },
        setCenter: (state, action: PayloadAction<Coordinate>) => {
            state.center = action.payload;
        }
    },
})

export const { selectContractor, handleCameraChanged, setCenter } = ContractorSearchMapState.actions
export default ContractorSearchMapState.reducer;