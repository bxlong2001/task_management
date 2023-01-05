import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { LOCAL_STORAGE_TOKEN_NAME } from '../../../contexts/constaints'
import { logoutUserSuccess } from '../../../redux/userSlice'

const NavBar = () => {
  const currentUser = useSelector((state: any) => state.user.loadUser.currentUser)
  const dispatch = useDispatch()

  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    dispatch(logoutUserSuccess())
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navbar">
      <Navbar.Brand to="/home" as={Link}>Task Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link to='/me/my-work' as={Link}>Trang cá nhân</Nav.Link>
        </Nav>
        <Nav>
          <Link to={'/me/info'}>
            <img src={currentUser?.avatar} alt='avatar' className="nav-user-avt"/>
          </Link>

          <NavDropdown title={currentUser.lastName + ' ' + currentUser.firstName} id="collasible-nav-dropdown" className="nav-user">
            <NavDropdown.Item to="me/info" as={Link}>Hồ sơ cá nhân</NavDropdown.Item>
            <NavDropdown.Item to="me/create-project" as={Link}>Tạo công việc mới</NavDropdown.Item>
            <NavDropdown.Item to="me/my-project" as={Link}>Công việc của bạn</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logOut}>
              Đăng xuất
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar