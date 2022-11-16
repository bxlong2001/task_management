import { Link, Navigate } from "react-router-dom"

const Landing = () => {
    return (
        <Navigate to='/login' as={Link}/>
    )
}

export default Landing