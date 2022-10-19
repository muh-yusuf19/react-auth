import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout"

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false)
    const { auth } = useAuth()
    const logout = useLogout()
    const navigate = useNavigate()

    const signOut = async () => {
        navigate("/")
        await logout()
    }

    return (
        <div className="font-poppins w-full flex flex-col max-w-screen-xl p-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between">
                <p className="text-lg font-bold px-4 py-2 tracking-wide text-bold focus:outline-none focus:border-2 focus:border-black">
                    <Link to="/">Logo Here</Link>
                </p>
                <button
                    onClick={() => setOpenNav(!openNav)}
                    className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
                >
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="w-6 h-6"
                    >
                        {openNav ? (
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        ) : (
                            <path
                                // x-show="!open"
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        )}
                    </svg>
                </button>
            </div>
            <nav
                className={`flex-col ${
                    openNav ? "flex border-2 border-t-0 border-black" : "hidden"
                } items-start md:items-center flex-1 pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
            >
                <p className="ml-4 md:ml-0 md:px-4 py-2 mt-2 md:mt-0 font-medium transition transfrom duration-150 md:mt-0 hover:-translate-y-2 focus:outline-none focus:border-2 focus:border-black">
                    <Link to="/">Home</Link>
                </p>
                {!auth?.accessToken && (
                    <>
                        <p className="ml-4 md:ml-0 md:px-4 py-2 mt-2 md:mt-0 font-medium transition transfrom duration-150 md:mt-0 md:ml-4 hover:-translate-y-2 focus:outline-none focus:border-2 focus:border-black">
                            <Link to="/login">Login</Link>
                        </p>
                        <p className="ml-4 md:ml-0 md:px-4 py-2 mt-2 md:mt-0 font-medium transition transfrom duration-150 md:mt-0 md:ml-4 hover:-translate-y-2 focus:outline-none focus:border-2 focus:border-black">
                            <Link to="/register">Register</Link>
                        </p>
                    </>
                )}

                {auth?.accessToken && (
                    <React.Fragment>
                        <p className="ml-4 md:ml-0 md:px-4 py-2 mt-2 md:mt-0 font-medium transition transfrom duration-150 md:mt-0 md:ml-4 hover:-translate-y-2 focus:outline-none focus:border-2 focus:border-black">
                            <Link to="/protected">Protected</Link>
                        </p>
                        <p className="ml-4 md:ml-0 md:px-4 py-2 mt-2 md:mt-0 font-medium transition transfrom duration-150 md:mt-0 md:ml-4 hover:-translate-y-2 focus:outline-none focus:border-2 focus:border-black">
                            <button onClick={signOut}>Logout</button>
                        </p>
                    </React.Fragment>
                )}
            </nav>
        </div>
    )
}

export default Navbar
