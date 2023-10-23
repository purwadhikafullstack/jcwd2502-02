import axios from "axios";

export const api = () => axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        authorization: localStorage.getItem("accessToken")
    }
})

export const api1 = () => axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        authorization: null
    }
})


// function ApiInstance(authorization = null) {
// 	return axios.create({
// 		baseURL: process.env.REACT_APP_API_BASE_URL,
// 		headers: {
// 			authorization,
// 		},
// 	});
// }

// export const Instance = ApiInstance;