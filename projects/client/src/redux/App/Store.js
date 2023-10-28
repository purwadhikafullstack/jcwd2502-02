import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/users";
import cartSlice from "../Features/cart";
import thunk from "redux-thunk";
import { useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        users: userSlice,
        cart: cartSlice,
    },
    middleware: [
        thunk
    ]
});

export const useAppSelector = useSelector;