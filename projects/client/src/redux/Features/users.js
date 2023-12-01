import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { axios } from "axios";


const initialState = {
    id: "",
    username: "",
    profile_picture: "",
    role: "",
    email: "",
    store_branch_id: "",
    isVerified: ""
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        login: (state, action) => {
            return state = { ...action.payload }
        },
        logout: (state, action) => {
            localStorage.removeItem("accessToken")
            return state = initialState;
        },
        setId: (state, { payload }) => {
            state.id = payload;
        },
        setUsername: (state, { payload }) => {
            state.username = payload;
        },
        setProfile_Picture: (state, { payload }) => {
            state.profile_picture = payload;
        },
        setRole: (state, { payload }) => {
            state.role = payload;
        },
        setEmail: (state, { payload }) => {
            state.email = payload;
        },
        setIsVerified: (state, { payload }) => {
            state.isVerified = payload
        },
        setStore_Branch_Id: (state, { payload }) => {
            state.store_branch_id = payload;
        }

    }, extraReducers: (builder) => {
        builder.addCase(login2.fulfilled, (state, action) => {
            if (action.payload) return state = action.payload
            return state
        })
    }
})

export const login2 = createAsyncThunk("auth", async (account, thunkApi) => {
    return await api().post(`/users/login`, account).then(({ data }) => {
        localStorage.setItem("accessToken", data.data.jwt)
        return data.data;
    }).catch((err) => {
        toast.error(err.response.data.message);
    })
})

export const onCheckIsLogin = () => async (dispatch) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const { data } = await api().get(`/users/fetch-user`)
        dispatch(login(data.data))
    } catch (error) {
        console.log("ini error", error.response.data.message);
    }
};


export const keepLogin = () => async (dispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await api().get('')
}

export const { login, logout, setId, setEmail, setProfile_Picture, setRole, setUsername } = userSlice.actions;
export default userSlice.reducer;