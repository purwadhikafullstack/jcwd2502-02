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
            console.log('>>>')
            console.log(action.payload)
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

export const addToCartAsync = (productId, stroreId, userStatus) => async (dispatch) => {
    try {
        // const navigate = useNavigate(); // Use the useNavigate hook
        const { data } = await api().get('/location/address/main')
        console.log(data);

        if (userStatus === "unverified") {
            toast.error("Please verify your account before adding products to the cart.");
            // navigate('/manage-address')
            return;
        }
        else if (userStatus === "verified") {
            if (data.data !== null) {
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
            } else {
                toast.error("Please add a main address before adding products to the cart.");
                // navigate('/manage-address')
                return;
            }
        }




    } catch (error) {
        console.log(error)
    }
};
export const addToCartAsync1 = (productId, storeId) => async (dispatch, getState) => {
    try {
        // Fetch the user's mainAddress from the state
        const mainAddress = getState().branch.mainAddress;
        console.log(mainAddress);
        // Check if the user has a mainAddress
        if (!mainAddress || Object.keys(mainAddress).length === 0) {
            toast.error("Please add a main address before adding products to the cart.");
            return;
        } else {
            const response1 = await api().post(`/cart/add?productId=${productId}&storeId=${storeId}`);
            console.log(response1);

            if (response1.data.isError === false) {
                toast.success(response1.data.message);
                dispatch(getCartAsync());
            } else {
                toast.error(response1.data.data);
                dispatch(getCartAsync());
            }
        }

        // If the user has a mainAddress, proceed with adding the product to the cart


    } catch (error) {
        console.log(error);
    }
};


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