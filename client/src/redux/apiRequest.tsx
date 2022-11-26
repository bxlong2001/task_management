import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../contexts/constaints'
import { loginStart, loginFailed, loginSuccess, registerStart, registerSuccess, registerFailed } from './authSlice'
import { LoginForm, RegisterForm } from '../interface'
import setAuthToken from '../components/auth/Auth/setAuthToken'
import { loadUserFailed, loadUserStart, loadUserSuccess } from './userSlice'

export const loadUser = async (dispatch: any) => {
    dispatch(loadUserStart())
    if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    } else {
        dispatch(loadUserFailed())
        return
    }

    try {
        const response = await axios.get(apiUrl + 'users/userCurrent')
        if(response.data.success)
            dispatch(loadUserSuccess(response.data.userCurrent))
        else {
            dispatch(loadUserFailed())
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken('')
        }
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
        
    }
}

export const loginUserWithGG = async (access_token: string, dispatch: any, navigate: any)=> {
    dispatch(loginStart())
    try {
        const response = await axios.post(apiUrl + 'users/auth/google', {access_token})
        if(response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token)
            setAuthToken(response.data.token)
            dispatch(loginSuccess())

            await loadUser(dispatch)
        }else {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            dispatch(loginFailed())
        }

        return response.data
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}

export const loginUser = async (loginForm: LoginForm, dispatch: any, navigate: any) => {
    dispatch(loginStart())
    try {
        const response = await axios.post(apiUrl + 'users/signIn', loginForm)
        
        if(response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token)
            setAuthToken(response.data.token)
            dispatch(loginSuccess())

            await loadUser(dispatch)
        }else {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            dispatch(loginFailed())
        }
        
        return response.data
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}

export const registerUser = async (registerForm: RegisterForm, dispatch: any, navigate: any) => {
    dispatch(registerStart())
    try {
        const response = await axios.post(apiUrl + 'users/signUp', registerForm)
        if(response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token)
            setAuthToken(response.data.token)
            dispatch(registerSuccess())

            await loadUser(dispatch)
        }else {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            dispatch(registerFailed())
        }
        return response.data
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}

export const refeshToken = async () => {
    try {
        const response = await axios.post('/users/refreshToken')
        if(response.data.status === "OK")
            return response.data.access_token
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}
