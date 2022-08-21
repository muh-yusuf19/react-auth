import Navbar from "./Navbar"
import { useState, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import axiosPrivate from "../api/axios"

const ResetPass = () => {

	const [password, setPassword] = useState("")
	const errRef = useRef()

	const [errMsg, setErrMsg] = useState()

	let { email } = useParams()

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await axiosPrivate.post('/reset-password')

			console.log(response.data)
		}catch (err) {
			console.log(err)
		}

	}

	return (

		<div className="flex flex-col h-screen">
			<Navbar />
			<p>This is Reset Password Page</p>

			<div className="flex-1 mx-auto md:w-full max-w-2xl">
	            <h1 className="font-bold text-center text-gray-200 text-2xl mb-5">Forgot Password</h1>
	            <div className="bg-gray-200 shadow w-full rounded-lg divide-y divide-gray-200">
	                <div className="px-5 py-7">
	                    <div
	                        className={`${
	                            errMsg
	                                ? "p-2 mb-5 bg-red-200 text-red-600 rounded-lg"
	                                : "hidden"
	                        }`}>
	                        <p ref={errRef}>{errMsg}</p>
	                    </div>

	                    <form onSubmit={handleSubmit}>
	                        <label
	                            htmlFor="passowrd"
	                            className="font-semibold text-base text-gray-600 pb-1 block">
	                            New Password
	                        </label>
	                        <input
	                            type="password"
	                            id="password"
	                            onChange={(e) => setPassword(e.target.value)}
	                            value={password}
	                            required
	                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-base w-full focus:outline-none shadow-md"/>
	                        <button
	                            type="submit"
	                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md font-semibold text-center inline-block">
	                            <span className="inline-block mr-2">Submit</span>
	                            <svg
	                                xmlns="http://www.w3.org/2000/svg"
	                                fill="none"
	                                viewBox="0 0 24 24"
	                                stroke="currentColor"
	                                className="w-5 h-5 inline-block">
	                                <path
	                                    strokeLinecap="round"
	                                    strokeLinejoin="round"
	                                    strokeWidth="2"
	                                    d="M17 8l4 4m0 0l-4 4m4-4H3"/>
	                            </svg>
	                        </button>
	                    </form>
	                </div>
	                <div className="py-5">
	                    <div className="grid grid-cols-2 gap-1">
	                        <div className="text-center sm:text-left whitespace-nowrap">
	                            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
	                                <svg
	                                    xmlns="http://www.w3.org/2000/svg"
	                                    fill="none"
	                                    viewBox="0 0 24 24"
	                                    stroke="currentColor"
	                                    className="w-4 h-4 inline-block align-text-top">
	                                    <path
	                                        strokeLinecap="round"
	                                        strokeLinejoin="round"
	                                        strokeWidth="2"
	                                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
	                                </svg>
	                                <span className="inline-block ml-1">
	                                    Forgot Password
	                                </span>
	                            </button>
	                        </div>
	                        <div className="text-center sm:text-right  whitespace-nowrap">
	                            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
	                                <svg
	                                    xmlns="http://www.w3.org/2000/svg"
	                                    fill="none"
	                                    viewBox="0 0 24 24"
	                                    stroke="currentColor"
	                                    className="w-4 h-4 inline-block align-text-bottom">
	                                    <path
	                                        strokeLinecap="round"
	                                        strokeLinejoin="round"
	                                        strokeWidth="2"
	                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
	                                </svg>
	                                <span className="inline-block ml-1">Help</span>
	                            </button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div className="py-5">
	                <div className="grid grid-cols-2 gap-1">
	                    <div className="text-center sm:text-left whitespace-nowrap">
	                        <div className="transition duration-200 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
	                            <div className="inline-flex items-center px-4">
	                            	<svg
		                                xmlns="http://www.w3.org/2000/svg"
		                                fill="none"
		                                viewBox="0 0 24 24"
		                                stroke="currentColor"
		                                className="w-4 h-4">
		                                <path
		                                    strokeLinecap="round"
		                                    strokeLinejoin="round"
		                                    strokeWidth="2"
		                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
		                            </svg>
		                            <span className="pl-2">
		                                <Link to="/">Back to Home</Link>
		                            </span>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		</div>

	)
}

export default ResetPass