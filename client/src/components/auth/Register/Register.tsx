import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Alert, RegisterForm } from "../../../interface"
import { registerUser } from "../../../redux/api/apiAuthRequest"
import AlertMessage from "../../layout/Alert/AlertMessage"



const Register = () => {
    const [alert, setAlert] = useState<Alert | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    })
    const {email, firstName, lastName, password, confirmPassword} = registerForm

    const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    const register = async (e: React.FormEvent) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setAlert({type: 'danger', message: 'Mật khẩu không khớp'})
            setTimeout(() => setAlert(null), 3000)
            return
        }

        try {
            const { confirmPassword, ...formData } = registerForm
            const registerData = await registerUser(formData, dispatch, navigate)
            if(!registerData.success) {
                setAlert({type: 'danger', message: registerData.error ? registerData.error.message : registerData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error);
            
        }

    }


    return (
        <>
            <Form onSubmit={register}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Nhập Họ'
                        name='firstName'
                        value={firstName}
                        maxLength={15}
                        required
                        onChange={handleRegister}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Nhập Tên'
                        name='lastName'
                        value={lastName}
                        maxLength={15}
                        required
                        onChange={handleRegister}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Nhập email'
                        name='email'
                        maxLength={30}
                        required
                        value={email}
                        onChange={handleRegister}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        maxLength={20}
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
                        placeholder='Nhập lại mật khẩu'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={handleRegister}
                    />
                    <AlertMessage info={alert}/>
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