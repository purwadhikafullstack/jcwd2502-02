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
        const response = await api().get('/cart/', {
            headers: { 'authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        console.log("GET SUCCESS");
        console.log(response.data.data);
        dispatch(setCarts(response.data.data));
    } catch (error) {
        console.log(error);
    }
}

export const addToCartAsync = (productId, stroreId) => async (dispatch) => {
    try {
        const response1 = await api().post(`/cart/add?productId=${productId}&stroreId=${stroreId}`)
        console.log(response1);
        if (!response1) return console.log("Data is not found")
        if (response1.data.isError == false) {
            toast.success(response1.data.message);
            dispatch(getCartAsync())
        } else if (response1.data.isError) {
            toast.error(response1.data.data);
            dispatch(getCartAsync())
        }

    } catch (error) {
        console.log(error)
    }
}

export const deleteItemInCartAsync = (data) => async (dispatch) => {
    try {
        console.log(data)
        const productId = data
        const response1 = await api().delete(`/cart/delete/${productId}`)
        console.log(response1);
        toast.success("Item deleted from Cart");
        console.log("DELETE SUCCESS");
        dispatch(getCartAsync())
    } catch (error) {
        console.log(error)
    }
}


export const { setCarts, clearCart } = cartSlice.actions

export default cartSlice.reducer