import Navbar from "./Navbar"
import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "../api/axios"
import { Formik, Form } from "formik"
import TextInput from "./TextInput"
import * as Yup from "yup"

const resetPassSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Minimum 8 Characters")
        .required("Password is required"),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Password must match")
        .required("Password is required"),
})

const ResetPass = () => {
    const errRef = useRef()

    const [errMsg, setErrMsg] = useState()
    const [success, setSuccess] = useState(false)

    let { resetToken } = useParams()

    const handleSubmit = (values, actions) => {
        axios
            .post(
                `/reset-password/${resetToken}`,
                { password: values.password },
                {
                    headers: { "Content-Type": "application/json" },
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
                error.response?.status == 0
                    ? setErrMsg("No Server Response")
                    : error.response?.status == 401
                    ? setErrMsg("Link expired")
                    : setErrMsg("Password reset canceled")
            })
    }

    useEffect(() => {
        setErrMsg()
    }, [errMsg])

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

                            <Formik
                                initialValues={{
                                    passord: "",
                                    passswordConfirm: "",
                                }}
                                validationSchema={resetPassSchema}
                                onSubmit={handleSubmit}
                            >
                                {(props) => (
                                    <Form>
                                        <TextInput
                                            label="Password"
                                            name="password"
                                            type="password"
                                        />
                                        <TextInput
                                            label="Password Confirmation"
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
                </div>
            </div>
        </React.Fragment>
    )
}

export default ResetPass
