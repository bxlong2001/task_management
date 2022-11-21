import Login from "../Login/Login"
import Register from "../Register/Register"

const Auth = ({authRoute}:any) => {
    let body

    body = (
        <>
            {authRoute === 'login' && <Login />}
            {authRoute === 'register' && <Register />}
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