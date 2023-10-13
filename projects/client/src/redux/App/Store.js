import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features";

const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export default store;
