import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SystemMessageProps from "src/features/system-message-queue/SystemMessageProps";

export interface SystemMessageQueueState {
    presenting: SystemMessageProps[];
}

const initialState: SystemMessageQueueState = {
    presenting: [],
};

const messagesAreEqual = (m1: SystemMessageProps, m2: SystemMessageProps) => m1.message === m2.message;

export const SystemMessageSlice = createSlice({
    name: 'systemMessageQueue',
    initialState,
    reducers: {
        presentSystemMessage: (state, action: PayloadAction<SystemMessageProps>) => {
            if(state.presenting.find(p => messagesAreEqual(p, action.payload)) == null) {
                state.presenting.push(action.payload);
                setTimeout(() => {
                    const i = state.presenting.findIndex(p => messagesAreEqual(p, action.payload));
                    if(i > -1) {
                        state.presenting.splice(i, 1);        
                    }
                }, action.payload.timeout)
            }
        },
    },
})

export const { presentSystemMessage } = SystemMessageSlice.actions
export default SystemMessageSlice.reducer