import { useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { loadUser } from "../../../redux/apiRequest"

const ProtectedRoute = () => {
    const { isFetching, isAuthenticated } = useSelector((state: any) => state.user.loadUser)
    const dispatch = useDispatch()

    useEffect(() => {
        loadUser(dispatch)
    }, [])

    if(isFetching)
        return (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    return (
        isAuthenticated ?
        <Outlet/> : <Navigate to='/login' /> 
    )
}

export default ProtectedRoute