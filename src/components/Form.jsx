import React, { useEffect, useRef, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "../api/axios"
import { useNavigate, useLocation, Link } from "react-router-dom"

const LOGIN_URL = "/auth"

const Form = () => {
    // Ref object
    const userRef = useRef()
    const errRef = useRef()

    // Navigasi user setelah login melalui halaman yg butuh auth
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    // State username dan password untuk login
    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")

    // Satate message ketika login
    const [errMsg, setErrMsg] = useState()
    const [loading, setLoading] = useState()

    // State setelah berhasil login
    const { setAuth, persist, setPersist } = useAuth()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg()
    }, [user, pwd])

    // function handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await axios.post(
                LOGIN_URL,
                {
                    user: user,
                    pwd: pwd,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )

            console.log(response?.data)
            setAuth({
                admin: response.data.admin,
                accessToken: response.data.accessToken,
            })
            setUser("")
            setPwd("")
            navigate(from, { replace: true })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            !error.response
                ? setErrMsg("No Server Response")
                : error.response?.status == 401
                ? setErrMsg("Wrong Credentials")
                : setErrMsg("Cannot Login")
        }
    }

    // function handle checked trust devices
    const togglePersist = () => {
        setPersist((prev) => !prev)
    }

    useEffect(() => {
        localStorage.setItem("persist", persist)
    }, [persist])

    return (
        <div className="w-full divide-y divide-gray-200">
            <div className="px-5 py-7">
                <div
                    className={`${
                        errMsg
                            ? "p-2 mb-5 bg-red-200 text-red-600 rounded-lg"
                            : "hidden"
                    }`}
                >
                    <p className="text-center font-bold" ref={errRef}>
                        {errMsg}
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="username"
                        className="text-base text-gray-600 pb-1 block"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full focus:outline-none"
                    />
                    <label
                        htmlFor="passowrd"
                        className="text-base text-gray-600 pb-1 block"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full focus:outline-none"
                    />
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                        className="rounded mt-1 mb-5"
                    />
                    <label className="text-gray-600 pl-2 pb-1">
                        Trust this devices
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className="transition duration-200 bg-blue-500 disabled:bg-blue-300 text-white text-center w-full py-2.5 rounded-lg text-base shadow-sm focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none hover:shadow-md inline-flex items-center justify-center"
                    >
                        <span className="inline-block mr-2">Login</span>
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
            <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                    <div className="text-center sm:text-left whitespace-nowrap">
                        <Link
                            to="/forgot-password"
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
                                Forgot Password
                            </span>
                        </Link>
                    </div>
                    <div className="text-center sm:text-right  whitespace-nowrap">
                        <Link
                            to="/register"
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
                            <span className="inline-block ml-1">Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
