import Navbar from "./Navbar"
import React, { useState, useRef, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "../api/axios"

const ResetPass = () => {
    const errRef = useRef()

    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState()

    let { resetToken } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(
                `/reset-password/${resetToken}`,
                { password: password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )

            console.log(response.data)
            setLoading(false)
            setSuccess(true)
            setPassword("")
        } catch (error) {
            setLoading(false)
            !error.response
                ? setErrMsg("No Server Response")
                : error.response?.status == 401
                ? setErrMsg("Link expired")
                : setErrMsg("Password reset canceled")
        }
    }

    useEffect(() => {
        setErrMsg()
    }, [password])

    return (
        <React.Fragment>
            <Navbar />
            <div className="font-poppins container mx-auto pt-8 w-full flex flex-col md:flex-row gap-6">
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="/images/Home.jpg"
                        alt="home"
                        className="object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    <h1 className="text-center text-5xl font-bold text-blue-600">
                        Reset password ...
                    </h1>
                    {success ? (
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-2xl text-center text-red-400 font-bold tracking-wider">
                                Congratulation your password hasbeen reseted
                            </h1>
                            <p>Please login with your new password</p>
                        </div>
                    ) : (
                        <div className="px-5 py-7">
                            <div
                                className={`${
                                    errMsg
                                        ? "p-2 mb-5 bg-red-200 text-red-600 rounded-lg"
                                        : "hidden"
                                }`}
                            >
                                <p
                                    className="text-center font-bold"
                                    ref={errRef}
                                >
                                    {errMsg}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <label
                                    htmlFor="passowrd"
                                    className="font-semibold text-base text-gray-600 pb-1 block"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    required
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full focus:outline-none shadow-md"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="transition duration-200 bg-blue-500 disabled:bg-blue-300 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md text-center inline-flex items-center justify-center"
                                >
                                    <span className="inline-block mr-2">
                                        Submit
                                    </span>
                                    {loading ? (
                                        <svg
                                            className="animate-spin w-8 h-8 border-4 border-white border-l-gray-300 border-b-gray-300 rounded-full"
                                            viewBox="0 0 24 24"
                                        ></svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-4 h-4 inline-block"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default ResetPass
