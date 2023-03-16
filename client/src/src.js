import { configureStore } from "@reduxjs/toolkit";
import conversationsReducer from "./conversationsSlice";


const store = configureStore({
    reducer: {
        conversations: conversationsReducer,
    },
});

export default store;