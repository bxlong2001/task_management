import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
        }
    },
    reducers:{
        // login
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state) => {
            state.login.isFetching = false
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },

        // register
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.error = false
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
        }
    }
})

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
} = authSlice.actions
export default authSlice.reducer