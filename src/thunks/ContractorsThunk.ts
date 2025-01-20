import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContractors, addFetchedLocation, ContractorsState, removeFetchedLocation } from 'src/store/contractorsSlice';
import { RootState } from 'src/store/store';
import haversine from 'haversine-distance';
import { presentSystemMessage } from 'src/store/systemMessageQueueSlice';
import { GENERIC_ERROR } from 'src/features/system-message-queue/SystemMessageProps';
import { FetchContractorsParams, fetchContractors } from 'src/services/ContractorService';

export const fetchContractorsThunk = createAsyncThunk<void, FetchContractorsParams, { state: RootState }>(
    'contractors/fetchContractor',
    async ({searchCoordinates, radius}, { getState, dispatch, rejectWithValue }) => {
        const state = getState();
        const willFetch = [...state.contractors.fetchedLocations].reduce((prev, curr) => prev && haversine(curr, searchCoordinates) * .000621371 > 30, true);
        if (willFetch) {
            dispatch(addFetchedLocation(searchCoordinates));
            await fetchContractors({
                searchCoordinates: searchCoordinates,
                radius: radius
            }).then((contractorProps) => {
                dispatch(addContractors(contractorProps));
            }).catch((err) => {
                dispatch(removeFetchedLocation(searchCoordinates));
                dispatch(presentSystemMessage({
                    message: GENERIC_ERROR,
                    level: 'error',
                    timeout: 0
                }));
                console.log(err);
            });
        }
    }
);