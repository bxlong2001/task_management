import React from 'react'
import { Col, Container, Row} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Category from '../Category/Category'
import NavBar from '../Navbar/NavBar'

const Layout: React.FC<{nav?: boolean}> = (props) => {

    return (
        <Container className="container-page">
            <NavBar />
            {!props?.nav?
            <Row>
                <Col sm={2}>
                    <Category />
                </Col>
                <Col sm={10}>
                    <Outlet />
                </Col>
            </Row>:
            <Outlet />
            }
        </Container>
    )
}

export default Layout