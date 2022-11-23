import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navbar">
      <Container>
        <Navbar.Brand to="/home" as={Link}>Task Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown" className="nav-user">
              <NavDropdown.Item href="#action/3.1">Hồ sơ cá nhân</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Tạo công việc mới</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Công việc của bạn</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar