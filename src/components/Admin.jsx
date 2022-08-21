import Navbar from "./Navbar"
import User from "./User"
import React from "react"

const Admin = () => {
    return (
        <React.Fragment>
            <Navbar />
            <h1>Admin Page</h1>
            <User />
        </React.Fragment>
    )
}

export default Admin
