import { React, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

const PresistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth, persist } = useAuth()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
                setIsLoading(false)
            }catch (err) {
                console.log(err)
            } 
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    return (<>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>)
}

export default PresistLogin
