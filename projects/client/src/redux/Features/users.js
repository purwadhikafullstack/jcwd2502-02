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
        }

    }, extraReducers: (builder) => {
        builder.addCase(login2.fulfilled, (state, action) => {
            console.log(action.payload, "hello");
            if (action.payload) return state = action.payload
            return state
        })
        // .addCase(onCheckIsLogin2.fulfilled, (state,action) => {
        //     if(action.payload) return state = action.payload
        //     return state
        // })
    }
})

export const login2 = createAsyncThunk("auth", async (account, thunkApi) => {
    return await api().post(`/users/login`, account).then(({ data }) => {
        localStorage.setItem("accessToken", data.data.jwt)
        return data.data;
    }).catch((err) => {
        console.log('an error has occurred');
        toast.error(err.response.data.message);
    })
})


// export const onCheckIsLogin2 = createAsyncThunk("auth", async (thunkApi)=> {
//     try {
//         const accessToken = localStorage.getItem("accessToken");
//         console.log("oncheck",accessToken);
//         try {
//             const {data} = await api().get(`/users/find-one`)
//             // dispatch(setId(data.data.id));
//             // dispatch(setUsername(data.data.username));
//             // dispatch(setProfile_Picture(data.data.profile_picture));
//             // dispatch(setRole(data.data.role));
//             // dispatch(setEmail(data.data.email));
//             // console.log(data.data.role);
//             // return data.data
//         } catch (error) {
//             console.log(error);
//         }
//     } catch (error) {
//         console.log(error.response.data.message);
//     }
// })


export const onCheckIsLogin = () => async (dispatch) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        console.log("oncheck", accessToken);
        const { data } = await api().get(`/users/fetch-user`)
        console.log("check", data.data);

        dispatch(login(data.data))

        // try {
        //     // dispatch(setId(data.data.id));
        //     // dispatch(setUsername(data.data.username));
        //     // dispatch(setProfile_Picture(data.data.profile_picture));
        //     // dispatch(setRole(data.data.role));
        //     // dispatch(setEmail(data.data.email));

        //     console.log(data.data);
        // } catch (error) {

        //     console.log(error);
        // }
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