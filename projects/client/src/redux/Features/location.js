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
            initialState.cart = action.payload
        },
        clearCart: (state) => {
            state.cart = [];
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
export default cartSlice.reducer