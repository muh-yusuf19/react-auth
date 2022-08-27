import React, { useEffect, useRef, useState } from "react"
import axios from "../api/axios"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { Formik, Form } from "formik"
import TextInput from "./TextInput"
import * as Yup from "yup"

const testSchema = Yup.object().shape({
    username: Yup.string()
        .min(10, "Min 10 Character")
        .max(20, "Max 10 Character")
        .required("Username required"),
    email: Yup.string().email("Invalid email").required("Email are required"),
    password: Yup.string().required("Password required"),
    passwordConfirm: Yup.string()
        .required("Password required")
        .oneOf([Yup.ref("password")], "Password not match"),
})

const Register = () => {
    // Ref object
    const errRef = useRef()

    // Satate error message
    const [errMsg, setErrMsg] = useState()
    const [success, setSuccess] = useState(false)

    // Ketika submit
    const handleRegister = (values, actions) => {
        axios
            .post(
                "/register",
                {
                    user: values.username,
                    pwd: values.password,
                    email: values.email,
                },
                {
                    headers: { "Content-type": "application/json" },
                    withCredentials: true,
                }
            )
            .then((response) => {
                actions.setSubmitting(false)
                actions.resetForm()
                setSuccess(true)
                console.log(response.data)
            })
            .catch((error) => {
                actions.setSubmitting(false)
                actions.resetForm()
                error.response.status == 0
                    ? setErrMsg("No Server Response")
                    : error.response?.status == 409
                    ? setErrMsg("username or email already exist")
                    : setErrMsg("Cannot Register")
            })
    }

    useEffect(() => {
        setErrMsg()
    }, [success])

    return (
        <React.Fragment>
            <Navbar></Navbar>
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
                        Welcome ...
                    </h1>
                    {success ? (
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-2xl text-center text-red-400 font-bold tracking-wider">
                                Congratulation your account are created
                            </h1>
                            <p>You can go to sign in or login page</p>
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
                            <Formik
                                initialValues={{
                                    username: "",
                                    email: "",
                                    password: "",
                                    passwordConfirm: "",
                                }}
                                validationSchema={testSchema}
                                onSubmit={handleRegister}
                            >
                                {(props) => (
                                    <Form>
                                        <TextInput
                                            label="Username"
                                            name="username"
                                            type="text"
                                        />
                                        <TextInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                        />
                                        <TextInput
                                            label="Password"
                                            name="password"
                                            type="password"
                                        />
                                        <TextInput
                                            label="Password Confirm"
                                            name="passwordConfirm"
                                            type="password"
                                        />
                                        <button
                                            type="submit"
                                            disabled={
                                                !props.isValid ||
                                                props.isSubmitting
                                            }
                                            className="transition duration-200 bg-blue-500 text-white text-center w-full py-2.5 rounded-lg text-base shadow-sm disabled:bg-blue-300 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none hover:shadow-md inline-flex items-center justify-center"
                                        >
                                            <span className="inline-block mr-2">
                                                Submit
                                            </span>
                                            {props.isSubmitting ? (
                                                <svg
                                                    className="animate-spin w-8 h-8 border-4 border-white border-l-gray-300 border-b-gray-300 rounded-full"
                                                    viewBox="0 0 24 24"
                                                ></svg>
                                            ) : null}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}

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

export default Register
