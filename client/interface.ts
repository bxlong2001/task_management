import React from 'react';
import { AuthState, AuthAction } from './src/reducers/authReducer';

interface Dispatch {
    type: string,
    payload: {
        isAuthenticated: boolean,
        user: any
    }
}

export interface AuthContextData {
    loginUser: (loginForm: FormData) => Promise<any>;
    loginUserWithGG: (user: any) => Promise<any>;
    authState: AuthState;
    authDispatch: React.Dispatch<AuthAction>;
}