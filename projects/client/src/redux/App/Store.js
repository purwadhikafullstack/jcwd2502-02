import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features";

export const store = configureStore({
    reducer: {
        users: userSlice,
    },
});