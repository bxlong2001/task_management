import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, Navigate } from "react-router-dom"

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const {username, password} = loginForm

    const login = async () => {

    }

    const handleLogin = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    return (
<>
            <Form onSubmit={login}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Nhập tài khoản'
                        name='username'
                        required
                        value={username}
                        onChange={handleLogin}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Nhập mật khẩu'
                        name='password'
                        required
                        value={password}
                        onChange={handleLogin}
                    />
                </Form.Group>
                {/* <AlertMessage info={alert}/> */}
                <Button variant='success' type='submit' size='lg' >Đăng nhập</Button>
            </Form>
            <p>{"Bạn chưa có tài khoản? "} 
                <Link to='/register'>
                    <Button variant='info' size='sm'>Đăng ký</Button>
                </Link>
            </p>
        </>
    )
}

export default Login