import axios from '../api/axios'
import useAuth from './useAuth'


const useLogout = () => {

	const { setAuth } = useAuth()

	const logout = async () => {
		setAuth({})
		try{
			const response = await axios.get('/logout', { withCredentials: true })
			console.log(response)
		}catch(err){
			console.log(err)
		}
	}

	return logout

}

export default useLogout