import { AnyAction } from '@reduxjs/toolkit';
import { Reducer } from 'react';

export interface LoginForm {
    email: string,
    password: string
}

export interface RegisterForm {
    firstName: string,
    lastName: string, 
    email: string, 
    password: string,
    confirmPassword?: string
}

export interface Alert {
    type?: string,
    message?: string
}