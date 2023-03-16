import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchUser = createAsyncThunk("users/fetchUser", (userId)=> {
    return fetch(`/user/${userId}`)
    .then((res)=> res.json())
    .then((data)=> data)
})

const initialState = {
    entities: [],
    status: "idle",
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        userAdded(state, action){

            state.entities.push(action.payload);
        },
        userUpdated(state, action){
            const user = state.entities.find((user)=> user.id === action.payload.id);
            user.messages = action.payload
        },
    },

    extraReducers: {
        [fetchUser.pending](state){
            state.status = "loading";
        },
        [fetchUser.fulfilled](state, action){
            state.entities = action.payload;
            state.status = "idle";
        },
    },
});

export const {userAdded, userUpdated} = usersSlice.actions;

export default usersSlice.reducer