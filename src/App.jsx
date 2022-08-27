import { Route, Routes, Link } from "react-router-dom"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Login from "./components/Login"
import Protected from "./components/Protected"
import Register from "./components/Register"
import Admin from "./components/Admin"
import ForgotPass from "./components/ForgotPass"
import ResetPass from "./components/ResetPass"
import Formit from "./components/Formit"
import RequireAuth from "./feature/RequireAuth"
import PresistLogin from "./feature/PresistLogin"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public Route */}
                    <Route path="/" element={<Home />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="admin" element={<Admin />}></Route>
                    <Route path="forgot-password" element={<ForgotPass />}></Route>
                    <Route path="reset-password/:resetToken" element={<ResetPass />}></Route>

                    {/* Protected Route */}
                    <Route element={<PresistLogin />}>
                        <Route element={<RequireAuth />}>
                            <Route path="protected" element={<Protected />}></Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
