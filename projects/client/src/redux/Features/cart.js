import axios from "axios";
import { toast } from "react-hot-toast";
import { api } from "../../api/api";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCarts: (initialState, action) => {
            console.log('>>>')
            console.log(action.payload)
            initialState.cart = action.payload
        },
        clearCart: (state) => {
            state.cart = [];
        },
    }
})

//masih belum bisa pake api instance..
export const getCartAsync = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8905/api/cart/', {
            headers: { 'authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        console.log("GET SUCCESS");
        console.log(response.data.data);
        dispatch(setCarts(response.data.data));
    } catch (error) {
        console.log(error);
    }
}


export const { setCarts, clearCart } = cartSlice.actions

export default cartSlice.reducer