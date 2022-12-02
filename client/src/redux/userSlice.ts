import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loadUser: {
            isFetching: false,
            isAuthenticated: false,
            currentUser: null,
            error: false
        },
    },
    reducers:{
        // load user
        loadUserStart: (state) => {
            state.loadUser.isFetching = true
        },
        loadUserSuccess: (state, action) => {
            state.loadUser.isFetching = false
            state.loadUser.currentUser = action.payload
            state.loadUser.isAuthenticated = true
            state.loadUser.error = false

        },
        loadUserFailed: (state) => {
            state.loadUser.isFetching = false
            state.loadUser.isAuthenticated = false
            state.loadUser.currentUser = null
            state.loadUser.error = true
        },
        logoutUserSuccess: (state) => {
            state.loadUser.isAuthenticated = false
            state.loadUser.currentUser = null
        }
    }
})

export const { 
    loadUserStart,
    loadUserFailed,
    loadUserSuccess,
    logoutUserSuccess
} = userSlice.actions
export default userSlice.reducer