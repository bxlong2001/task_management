import { useContext, useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { AuthContextData } from "../../../../interface"
import { apiUrl, GOOGLE_CLIENT_ID } from "../../../contexts/constaints"
import { GoogleLogin, GoogleLogout } from "react-google-login"
import { gapi } from "gapi-script"

const Login = () => {
    const {loginUser, loginUserWithGG} = useContext(AuthContext) as AuthContextData
    
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: GOOGLE_CLIENT_ID,
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
    }, []);
    

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const {username, password} = loginForm

    const login = async () => {

    }

    // const loginWithGG = async (e: any) => {
    //     e.preventDefault()

    //     window.open(`${apiUrl}/auth/google`, "_self")
    // }

    const onSuccess = async (res: any) => {
        
        try {
            // console.log(res);
            const loginData = await loginUserWithGG(res.accessToken)
            if(!loginData.success) {
                console.log('Login failure!');
                return
            }
            console.log('Success!');
            

        } catch (error) {
            
        }
    }

    const onFailure = (res: any) => {
        console.log("LOGIN FAILURE! res: ", res);
    }

    const onLogoutSuccess = () => {
        console.log('SUCESS LOG OUT');
      }

    const handleLogin = (e: any) => {
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
                <br />
                <span>hoặc</span>
                <br />
                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Đăng nhập với Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
                <GoogleLogout
                    clientId={GOOGLE_CLIENT_ID}
                    onLogoutSuccess={onLogoutSuccess}
                />
                {/*<button className="google_btn" onClick={loginWithGG}>
                    <img src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png" alt="google icon"></img>
                    <span>Đăng nhập với Google</span>
                </button> */}
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