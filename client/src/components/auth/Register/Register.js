import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        fullname: '',
        password: '',
        confirmPassword: ''
    })
    const {username, fullname, password, confirmPassword} = registerForm


    const Register = async () => {

    }

    const handleRegister = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Form onSubmit={Register}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Nhập họ tên'
                        name='fullname'
                        value={fullname}
                        maxLength={30}
                        minLength={6}
                        required
                        onChange={handleRegister}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Nhập tài khoản'
                        name='username'
                        maxLength={20}
                        minLength={6}
                        required
                        value={username}
                        onChange={handleRegister}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        maxLength={20}
                        minLength={6}
                        placeholder='Nhập mật khẩu'
                        name='password'
                        required
                        value={password}
                        onChange={handleRegister}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        maxLength={20}
                        minLength={6}
                        placeholder='Nhập lại mật khẩu'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={handleRegister}
                    />
                {/* <AlertMessage info={alert}/> */}
                </Form.Group>
                <Button variant='success' type='submit' size='lg'>Đăng ký</Button>
            </Form>
            <p>{"Bạn có đã có tài khoản? "} 
                <Link to='/login'>
                    <Button variant='info' size='sm'>Đăng nhập</Button>
                </Link>
            </p>
        </>
    )
}

export default Register