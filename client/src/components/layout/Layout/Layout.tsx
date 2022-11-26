import { Col, Container, Row} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Category from '../Category/Category'
import NavBar from '../Navbar/NavBar'

const Layout = () => {

    return (
        <Container className="container-page">
            <NavBar />
            <Row>
                <Col sm={2}>
                    <Category />
                </Col>
                <Col sm={10}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}

export default Layout