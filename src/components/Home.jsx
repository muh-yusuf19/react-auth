import React from "react"
import Navbar from "./Navbar"

const Home = () => {
    return (
        <React.Fragment>
            <Navbar></Navbar>
            <div className="font-poppins container px-4 mx-auto pt-8 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <h1 className="text-7xl font-bold">
                        <span className="text-blue-600">ReactJs</span>{" "}
                        Authentication
                    </h1>
                    <div className="mt-8 text-lg text-justify">
                        <p>
                            Website ini merupakan contoh penerapan authentikasi
                            menggunakan Reactjs sebagai frontend dan express js
                            sebagai backend API. Untuk styling frontend saya
                            menggunakan tailwindcss , sedangkan untuk backend
                            saya juga menggunakan serta json web token untuk
                            membuat access token dan refresh token.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="h-3/4">
                        <img
                            src="/images/Home.jpg"
                            alt="home"
                            className="object-cover h-auto"
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home
