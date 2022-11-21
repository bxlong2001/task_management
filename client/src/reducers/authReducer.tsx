export interface AuthState {
    authLoading: boolean,
    isAuthenticated: boolean,
    user: any,
}

export interface AuthAction {
    type: string,
    payload: {
        isAuthenticated: boolean,
        user: any
    }
}

const authReducer = (state: AuthState, action: AuthAction) => {
    const {type, payload: {isAuthenticated, user}} = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        default:
            return state
    }
}

export default authReducer