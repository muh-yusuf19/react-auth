import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "../api/axios"
import Navbar from "./Navbar"

const ForgotPass = () => {
    const errRef = useRef()
    const [errMsg, setErrMsg] = useState()

    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await axios.post(
                "/forgot-password",
                { email: email },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )

            console.log(response?.response)
            setSuccess(true)
            setLoading(false)
            setEmail("")
        } catch (error) {
            !error.response
                ? setErrMsg("No Server Response")
                : error.response?.status == 400
                ? setErrMsg("Can't find email")
                : setErrMsg("Cannot send reset password link")
        }
    }

    useEffect(() => {
        setErrMsg()
    }, [email])

    return (
        <React.Fragment>
            <Navbar />
            <div className="font-poppins container mx-auto pt-8 w-full flex flex-col md:flex-row gap-6">
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="/images/Home.jpg"
                        alt="home"
                        className="object-cover h-3/4"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-center text-5xl font-bold text-blue-600">
                        Reset Password ...
                    </h1>
                    {success ? (
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-2xl text-center text-red-400 font-bold tracking-wider">
                                Congratulation your reset-password link hasbeen
                                send
                            </h1>
                            <p>Please check your email</p>
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
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-base text-gray-600 pb-1 block"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full focus:outline-none"
                                    />
                                </div>
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
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <Link
                                    to="/register"
                                    className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-red-500 hover:text-white focus:text-white focus:outline-none focus:bg-red-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-4 h-4 inline-block align-text-top"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="inline-block ml-1">
                                        Register
                                    </span>
                                </Link>
                            </div>
                            <div className="text-center sm:text-right  whitespace-nowrap">
                                <Link
                                    to="/login"
                                    className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-blue-500 hover:text-white focus:text-white focus:outline-none focus:bg-red-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-4 h-4 inline-block align-text-bottom	"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                    <span className="inline-block ml-1">
                                        Login
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ForgotPass
