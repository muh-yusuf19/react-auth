import React from "react"
import useAuth from "./useAuth"
import axios from "../api/axios"

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        try {
            const response = await axios.get("/refresh", {
                withCredentials: true,
            })

            setAuth((prev) => {
                console.log(prev)
                console.log(response.data.accessToken)
                return { ...prev, admin:response.data.admin, accessToken: response.data.accessToken }
            })
            return response.data.accessToken
        } catch (err) {
            console.log(err)
        }
    }
    // const refresh = () => {
    //     axios
    //         .get("/api/auth/refreshToken", { withCredentials: true })
    //         .then((res) => {
    //             console.log(res)
    //         })
    // }

    return refresh
}

export default useRefreshToken
