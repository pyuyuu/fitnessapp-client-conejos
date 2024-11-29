import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavBar() {
    const { user } = useContext(UserContext);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Fitness App</Navbar.Brand>
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        )}
                        
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
