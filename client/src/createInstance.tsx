import axios from 'axios'
import jwt_decode from "jwt-decode"
import setAuthToken from './components/auth/Auth/setAuthToken'
import { refeshToken } from './redux/apiRequest'

export const createAxios = (user: any, dispatch: any, stateSuccess: any) => {
    const newInstance = axios.create()

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date()
            const decodedToken: any = jwt_decode(user?.access_token)
            if(decodedToken.exp < date.getTime() / 1000) {
                const data = await refeshToken()
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken
                }
                dispatch(stateSuccess(refreshUser))
                setAuthToken(data.accessToken)
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )
}