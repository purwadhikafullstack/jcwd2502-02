import { api } from "../../api/api";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    branch: [], closestBranch: [], mainAddress: []
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
        setClosestBranch: (state, action) => {
            state.closestBranch = action.payload
        },
        setMainAddress: (state, action) => {
            state.mainAddress = action.payload
        },
    }
})

export const onGetBranchAsync = () => async (dispatch) => {
    try {
        const { data } = await api().get('/branch/all');
        dispatch(setBranch(data.data))
    } catch (error) {
        console.log(error);
    }
}
export const getMainAddress = () => async (dispatch) => {
    try {
        const { data } = await api().get('/location/address/main')
        dispatch(setMainAddress(data.data))
    } catch (error) {
        console.log(error);
    }
}

export const nearestBranch = () => async (dispatch) => {
    try {
        const userAddress = await api().get('/location/address/main')
        const userLatitude = userAddress.data.data.latitude;
        const userLongitude = userAddress.data.data.longitude;
        const { data } = await api().get('/branch/all');
        let nearest = null;
        let minDistance = Infinity;
        data.data.forEach((location, idx) => {
            const lat1 = userLatitude;
            const lon1 = userLongitude;
            const lat2 = location.latitude;
            const lon2 = location.longitude;
            const R = 6371; // Earth's radius in km
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            // console.log(distance, minDistance, idx);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = location;
            }
        });
        dispatch(setClosestBranch(nearest))
    } catch (error) {
        console.log(error);
    }
}

export const { setBranch, clearBranch, setClosestBranch, setMainAddress } = branchSlice.actions;
export default branchSlice.reducer;