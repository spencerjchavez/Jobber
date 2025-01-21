import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserProps from "src/global-types/UserProps";

// Define a type for the slice state
export interface UsersState {
    userProps: { [userId: string]: UserProps };
}

// Define the initial state
const initialUserProps: { [userId: string]: UserProps} = {
    '1': {
        userId: '1',
        name: 'Karen',
        profilePicture: 'https://qph.cf2.quoracdn.net/main-qimg-6f8532751ceb198802a5a438cb5c634e-lq'
    }
};

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