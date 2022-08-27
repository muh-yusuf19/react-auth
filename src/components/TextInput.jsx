import React from "react"
import { useField, ErrorMessage } from "formik"

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    // console.log(props)
    return (
        <div className="flex flex-col mb-3">
            <label>{label}</label>
            <input
                {...field}
                {...props}
                className={`border ${
                    meta.error && "border-red-500"
                } rounded-lg px-3 py-2 mt-1 text-base w-full focus:outline-none`}
            />
            {meta.error && meta.touched ? (
                <small className="text-red-500">{meta.error}</small>
            ) : null}
        </div>
    )
}

export default TextInput
