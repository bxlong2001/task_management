import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/auth/Auth/Auth';
import Landing from './components/auth/Landing/Landing';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Auth authRoute='login'/>}/>
          <Route path='/register' element={<Auth authRoute='register'/>}/>
          <Route path='/home' element={<Auth authRoute='register'/>}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
