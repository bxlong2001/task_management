import { AnyAction } from '@reduxjs/toolkit';
import { Reducer } from 'react';
// import React from 'react';
// import { AuthState, AuthAction } from './src/reducers/authReducer';

// interface Dispatch {
//     type: string,
//     payload: {
//         isAuthenticated: boolean,
//         user: any
//     }
// }

// export interface AuthContextData {
//     loginUser: (loginForm: FormData) => Promise<any>;
//     loginUserWithGG: (user: any) => Promise<any>;
//     authState: AuthState;
//     authDispatch: React.Dispatch<AuthAction>;
// }

export interface LoginForm {
    email: string,
    password: string
}

export interface RegisterForm {
    firstName: string,
    lastName: string, 
    email: string, 
    password: string
}

export interface Alert {
    type?: string,
    message?: string
}