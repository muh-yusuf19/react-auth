import React from "react"
import axios from "../api/axios"
import useRefreshToken from "../hooks/useRefreshToken"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"

const Protected = () => {
    // const refresh = useRefreshToken()

    const cookie = () => {
        axios.get("/refresh", { withCredentials: true }).then((res) => {
            console.log(res.data)
        })
    }

    return (
        <React.Fragment>
            <Navbar></Navbar>
            <div className="p-4">   
                <h1 className="font-bold text-2xl">This is Protected Route</h1>
                <ul className="my-4">
                    <li className="p-2 bg-blue-500 text-white">
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>
                <button
                    onClick={cookie}
                    className="p-4 bg-blue-500 text-white text-base"
                >
                    Refresh
                </button>
            </div>
        </React.Fragment>
    )
}

export default Protected
