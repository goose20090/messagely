import { configureStore } from "@reduxjs/toolkit";
import conversationsReducer from "./conversationsSlice";
import usersReducer from "./usersSlice";


const store = configureStore({
    reducer: {
        conversations: conversationsReducer,
        users: usersReducer,
    },
});

export default store;