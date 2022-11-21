import React, { createContext, Reducer, useReducer } from "react";
import axios from 'axios'
import authReducer, { AuthAction, AuthState } from '../reducers/authReducer'
import setAuthToken from '../utils/setAuthToken'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constaints";
import { AuthContextData } from "../../interface";

const AuthContext = createContext<AuthContextData | undefined>(undefined)

const AuthContextProvider = ({children}:any) => {
    const [authState, authDispatch] = useReducer<Reducer<AuthState, AuthAction>>(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    //Authenticate user
    const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const response = await axios.get(apiUrl + 'auth')
			if (response.data.success) {
				authDispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user}
				})
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			authDispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null}
			})
		}
	}

    //Login
    const loginUser = async (loginForm:FormData)=> {
        try {
            const response = await axios.post(apiUrl + 'auth/login', loginForm)
            if(response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)

            await loadUser()

            return response.data
        } catch (error: any) {
            if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
        }
    }

    //Login
    const loginUserWithGG = async (access_token: string)=> {
        try {
            const response = await axios.post(apiUrl + 'users/auth/google', {access_token})
            console.log(response);
            
            return response.data
        } catch (error: any) {
        }
    }

    const authContextData = { loginUser, loginUserWithGG, authState, authDispatch}


    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}
export {AuthContext}
export default AuthContextProvider