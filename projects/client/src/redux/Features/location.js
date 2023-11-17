import { toast } from "react-hot-toast";
import { api } from "../../api/api";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    branch: []
}

export const cartSlice = createSlice({
    name: 'branch',
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


// export const { setCarts, clearCart } = cartSlice.actions

export default cartSlice.reducer