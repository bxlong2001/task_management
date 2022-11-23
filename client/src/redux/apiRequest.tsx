import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../contexts/constaints'
import { loginFailed, loginStart, loginSuccess } from './authSlice'

export const loginUserWithGG = async (access_token: string, dispatch: any, navigate: any)=> {
    dispatch(loginStart)
    try {
        const response = await axios.post(apiUrl + 'users/auth/google', {access_token})
        if(response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.token)
            dispatch(loginSuccess(response.data.token))
            navigate('/home')
        }

        return response.data
    } catch (error: any) {
        dispatch(loginFailed)
    }
}
