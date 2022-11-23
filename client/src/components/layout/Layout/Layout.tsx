import { Col, Container, Row } from 'react-bootstrap'
import Category from '../Category/Category'
import NavBar from '../Navbar/NavBar'

const Layout = ({Component}: any) => {
    return (
        <Container className="container-page">
            <NavBar />
                <Row>
                    <Col sm={2}>
                        <Category />
                    </Col>
                    <Col sm={10}>
                        <Component />
                    </Col>
                </Row>
        </Container>
    )
}

export default Layout