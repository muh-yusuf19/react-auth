import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom"

const User = () => {
    const [users, setUsers] = useState([])
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true

        // abort request without response
        const controller = new AbortController()

        // Function to fetch users data
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(
                    "/users", {
                        signal: controller.signal
                    }
                )
                console.log(response.data)
                
                //Store data in state 
                isMounted && setUsers(response.data)
            } catch (err) {

                // Redirect to login if error not canceled
                if(err.message !== 'canceled'){
                    navigate('/login', { state: { from: location }, replace:true  })
                }
                console.log(err.message)
            }
        }

        // Call function to fetch users data
        getUsers()

        // 
        return () => {
        	isMounted = false
        	controller.abort()
        }
    }, [])

    return (
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-xl">
            <h1 className="font-bold text-center text-2xl mb-5">User List</h1>
            <div className="bg-gray-200 shadow w-full rounded-lg divide-y divide-gray-200">
                <div className="p-5">
                    <ul className="space-y-2 list-none">
                        {users.map((data, i)=> {
                            return (
                            <li key={i} className="p-2 bg-blue-500 text-white rounded-md">
                                {data.username}
                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default User
