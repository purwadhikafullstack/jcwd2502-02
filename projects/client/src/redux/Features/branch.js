import { api } from "../../api/api";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    branch: []
}

export const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers: {
        setBranch: (state, action) => {
            state.branch = action.payload
        },
        clearBranch: (state) => {
            state.branch = [];
        },
    }
})

export const onGetBranchAsync = () => async (dispatch) => {
    try {
        const {data} = await api().get('/branch/all');
        console.log(data);
        dispatch(setBranch(data.data))
    } catch (error) {
        console.log(error);
    }
}

export const {setBranch, clearBranch} = branchSlice.actions;
export default branchSlice.reducer;