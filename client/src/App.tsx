import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Auth from './components/auth/Auth/Auth';
import Landing from './components/auth/Landing/Landing';
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import Home from './components/home/Home';
import Layout from './components/layout/Layout/Layout';

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Auth authRoute='login'/>}/>
          <Route path='/register' element={<Auth authRoute='register'/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route element={<Layout />}>
              <Route path='/home' element={<Home />}/>
            </Route>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
