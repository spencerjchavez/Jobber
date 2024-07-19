import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserProps from "src/global-types/UserProps";

// Define a type for the slice state
export interface UsersState {
    userProps: { [userId: number]: UserProps };
}

// Define the initial state
const initialUserProps: { [userId: number]: UserProps} = {};

const initialState: UsersState = {
    userProps: initialUserProps,
}

export const UsersSlice = createSlice({
    name: 'users',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addUsers: (state, action: PayloadAction<UserProps[]>) => {
            action.payload.forEach((userProps) => {
                state.userProps[userProps.userId] = userProps;
            })
        },
        deleteUsers: (state, action: PayloadAction<number[]>) => {
            action.payload.forEach((userId) => {
                delete state.userProps[userId];
            })
        }
    },
})

export const { addUsers, deleteUsers } = UsersSlice.actions
export default UsersSlice.reducer