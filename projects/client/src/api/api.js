import axios from "axios";
export const api = () => axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        authorization: 'Bearer ' + localStorage.getItem("accessToken")
    }
})
export const api1 = () => axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        headers: { 'Custom-Header': 'foobar' },
        secretKey: process.env.REACT_APP_API_SECRET_KEY
    }
})