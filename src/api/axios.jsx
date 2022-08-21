import axios from "axios"

export default axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "http://localhost:3500",
})

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:3500",
    headers: { 'Content-Type' : 'application/json' },
    withCredentials: true
})
