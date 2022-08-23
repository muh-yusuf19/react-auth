import React from "react"
import Navbar from "./Navbar"
import Form from "./Form"

const Login = () => {
    return (
        <React.Fragment>
            <Navbar></Navbar>
            <div className="font-poppins container mx-auto pt-8 w-full flex flex-col md:flex-row gap-6">
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="/images/Home.jpg"
                        alt="home"
                        className="object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-center text-5xl font-bold text-blue-600">
                        Welcome ...
                    </h1>
                    <Form />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login
