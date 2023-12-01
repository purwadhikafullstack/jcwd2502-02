import { toast } from "react-hot-toast";
import { api } from "../../api/api";
// import { useNavigate } from "react-router-dom";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    cart: [],
    mainAddress: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCarts: (initialState, action) => {
            initialState.cart = action.payload
        },
        clearCart: (state) => {
            state.cart = [];
        },
        setMainAddress: (state, action) => {
            state.mainAddress = action.payload
        },
    }
})

export const getCartAsync = () => async (dispatch) => {
    try {
        const response = await api().get('/cart/', {
            headers: { 'authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        });
        dispatch(setCarts(response.data.data));
    } catch (error) {
        console.log(error);
    }
}

export const addToCartAsync = (productId, stroreId, userStatus) => async (dispatch) => {
    try {
        const { data } = await api().get('/location/address/main')
        if (userStatus === "unverified") {
            toast.error("Please verify your account before adding products to the cart.");
            return;
        }
        else if (userStatus === "verified") {
            if (data.data !== null) {
                const response1 = await api().post(`/cart/add?productId=${productId}&stroreId=${stroreId}`)
                if (!response1) return console.log("Data is not found")
                if (response1.data.isError == false) {
                    toast.success(response1.data.message);
                    dispatch(getCartAsync())
                } else if (response1.data.isError) {
                    toast.error(response1.data.data);
                    dispatch(getCartAsync())
                }
            } else {
                toast.error("Please add a main address before adding products to the cart.");
                return;
            }
        }
    } catch (error) {
        console.log(error)
    }
};
export const addToCartAsync1 = (productId, storeId) => async (dispatch, getState) => {
    try {
        const mainAddress = getState().branch.mainAddress;
        if (!mainAddress || Object.keys(mainAddress).length === 0) {
            toast.error("Please add a main address before adding products to the cart.");
            return;
        } else {
            const response1 = await api().post(`/cart/add?productId=${productId}&storeId=${storeId}`);
            if (response1.data.isError === false) {
                toast.success(response1.data.message);
                dispatch(getCartAsync());
            } else {
                toast.error(response1.data.data);
                dispatch(getCartAsync());
            }
        }
    } catch (error) {
        console.log(error);
    }
};


export const deleteItemInCartAsync = (data) => async (dispatch) => {
    try {
        const productId = data
        const response1 = await api().delete(`/cart/delete/${productId}`)
        toast.success("Item deleted from Cart");
        dispatch(getCartAsync())
    } catch (error) {
        console.log(error)
    }
}


export const { setCarts, clearCart } = cartSlice.actions

export default cartSlice.reducer