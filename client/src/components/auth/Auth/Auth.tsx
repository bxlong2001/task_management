import React from "react"
import { Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Login from "../Login/Login"
import Register from "../Register/Register"

const Auth: React.FC<{authRoute: string}> = (props) => {
    const { isFetching, isAuthenticated } = useSelector((state: any) => state.user.loadUser)
    
    let body

    if (isFetching)
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    else if (isAuthenticated)
        body = (
            <Navigate to='/home' />
        )
    else
        body = (
            <>
                {props.authRoute === 'login' && <Login />}
                {props.authRoute === 'register' && <Register />}
            </>
        )

    return (
        <div className='wallpaper'>
        <div className='dark-overlay'>
            <div className='wrap'>
                <h1>Quản Lý Công Việc</h1>
                {body}
            </div>
        </div>
    </div>
    )
}

export default Auth