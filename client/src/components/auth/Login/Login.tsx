import React, { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { GOOGLE_CLIENT_ID } from "../../../contexts/constaints"
import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"
import { loginUserWithGG, loginUser } from "../../../redux/api/apiAuthRequest"
import { useDispatch } from "react-redux"
import AlertMessage from "../../layout/Alert/AlertMessage"
import { Alert, LoginForm } from "../../../interface"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alert, setAlert] = useState<Alert | null>(null)

    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: '',
        password: ''
    })
    
    const {email, password} = loginForm
    
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: GOOGLE_CLIENT_ID,
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
    }, []);

    const login = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const loginData = await loginUser(loginForm, dispatch, navigate)
            if(!loginData.success) {
                setAlert({type: 'danger',  message: loginData.error ? loginData.error.message : loginData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const onSuccess = async (res: any) => {
        try {
            const loginData = await loginUserWithGG(res.accessToken, dispatch, navigate)
            if(loginData.error) {
                setAlert({type: 'danger', message: loginData.error.message})
                setTimeout(() => setAlert({type: '', message: ''}), 3000)
            }
            

        } catch (error) {
            console.log(error);     
        }
    }

    const onFailure = (res: any) => {
        setAlert({type: 'danger', message: 'LOGIN FAILURE! res: ' + res})
        setTimeout(() => setAlert({type: '', message: ''}), 3000)
    }

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    //Facebook
    const componentClicked = (data: any) => {
        console.warn(data);
    }

    const responseFacebook = (res: any) => {
        console.log("login result: ", res);
        
    }


    return (
        <>
            <Form onSubmit={login}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Nh???p t??i kho???n'
                        name='email'
                        required
                        value={email}
                        onChange={handleLogin}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Nh???p m???t kh???u'
                        name='password'
                        required
                        value={password}
                        onChange={handleLogin}
                    />
                </Form.Group>
                
                <AlertMessage info={alert}/>
                <Button variant='success' type='submit' size='lg' >????ng nh???p</Button>
                <br />
                <span>ho???c</span>
                <br />
                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="????ng nh???p v???i Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </Form>
            <p>{"B???n ch??a c?? t??i kho???n? "} 
                <Link to='/register'>
                    <Button variant='info' size='sm'>????ng k??</Button>
                </Link>
            </p>
        </>
    )
}

export default Login