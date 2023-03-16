import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchConversations = createAsyncThunk("conversations/fetchConversations", ()=> {
    return fetch("/conversations")
    .then((res)=> res.json())
    .then((data)=> data)
})

const initialState = {
    entities: [],
    status: "idle",
}

const conversationsSlice = createSlice({
    name: "conversations",
    initialState,
    reducers:{
        conversationAdded(state, action){

            state.entities.push(action.payload);
        },
        conversationUpdated(state, action){
            const conversation = state.entities.find((conversation)=> conversation.id === action.payload.id);
            conversation.messages = action.payload
        },
    },

    extraReducers: {
        [fetchConversations.pending](state){
            state.status = "loading";
        },
        [fetchConversations.fulfilled](state, action){
            state.entities = action.payload;
            state.status = "idle";
        },
    },
});

export const {conversationAdded, conversationUpdated} = conversationsSlice.actions;

export default conversationsSlice.reducer