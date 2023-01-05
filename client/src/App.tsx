import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./components/auth/Auth/Auth";
import Landing from "./components/auth/Landing/Landing";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import Home from "./components/home/Home";
import LayoutApp from "./components/layout/Layout/Layout";
import NotFound from "./components/notFound/NotFound";
import CreateProject from "./components/project/CreateProject";
import Info from "./components/user/Info/Info";
import MyProjects from "./components/user/MyWork/MyProjects";
import MyTasks from "./components/user/MyWork/MyTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/register" element={<Auth authRoute="register" />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutApp />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutApp nav={false}/>}>
            <Route path="/me/info" element={<Info />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutApp nav={false}/>}>
            <Route path='/me/my-project' element={<MyProjects />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutApp nav={false}/>}>
            <Route path='/me/my-task' element={<MyTasks />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutApp nav={false}/>}>
            <Route path='/me/create-project' element={<CreateProject />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
