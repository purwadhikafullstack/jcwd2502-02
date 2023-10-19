import toast from "react-hot-toast";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: "",
    username: "",
    profile_picture: "",
    role: "",
    email: "",
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // setId: (initialState, {payload}) => {
        //     initialState.id = payload
        // },
        // setUsername: (initialState, {payload}) => {
        //     initialState.username = payload
        // },
        // setProfile_picture: (initialState, {payload}) => {
        //     initialState.profile_picture = payload
        // },
        // setRole: (initialState, {payload}) => {
        //     initialState.role = payload
        // },
        // setEmail: (initialState, {payload}) => {
        //     initialState.email = payload
        // },
        login : (state,action) => {
            return state = {...action.payload}
        },
        logout : (state,action) => {
            return state = initialState;
        }
    },extraReducers: (builder) => {
        builder.addCase(login2.fulfilled, (state,action) => {
            if(action.payload) return state = action.payload
            return state
        } )
    }
})

export const login2 = createAsyncThunk("auth", async (account, thunkApi)=> {
    return  await axios.post(`users/login`, {username, password}).then(() => {
        localStorage.setItem("accessToken", data.data.jwt)

    }).catch((err ) => {
        console.log('an error has occurred');
        toast.error(error.response.data.message);
    })} )

export const login = ({email, password}) => {
    async (dispatch) => {
        try {
            const data = await axios.post(`users/login`, {username, password});
            
            localStorage.setItem("accessToken", data.data.jwt);
            // dispatch(setId(data.data.id));
            // dispatch(setEmail(data.data.email));
            // dispatch(setUsername(data.data.username));
            // dispatch(setProfile_picture(data.data.profile_picture));
            dispatch(login(data.data))

        } catch (error) {
            console.log('an error has occurred');
            toast.error(error.response.data.message);
        }
    }
}

export const keepLogin = () => async (dispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    const {data} = await axios.get('')

    // ulang proses setelah jwt di confirm dan simpen 
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("accessToken");
    // dispatch(setId(""));
    // dispatch(setEmail(""));
    // dispatch(setUsername(""));
    // dispatch(setProfile_picture(""));
    // dispatch(setRole(""));
    dispatch(logout())
}