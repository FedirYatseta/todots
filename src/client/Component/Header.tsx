import React, { FC } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header: FC = () => {
    return (
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container className=' flex-row'>
                <Navbar.Brand href="/">Go Auth</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto ">
                        <Nav.Link href="/signUp">Sign UP</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header