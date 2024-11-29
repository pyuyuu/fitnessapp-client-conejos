import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    function loginUser(e) {
        e.preventDefault();

        fetch(`https://fitnessapp-api-ln8u.onrender.com/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem('token', data.access);
                setUser({ email });

                setEmail('');
                setPassword('');

                navigate('/Workouts');
                toast.success('Login successful!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (data.message || data.error) {
                toast.error('Login failed. Please try again.');
        }
    })
    .catch(error => {
        toast.error('Login failed. Please try again.', error);
    });
}
    return (
        <Form onSubmit={loginUser}>
            <h1 className="my-5 text-center">Login</h1>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" disabled={!isActive}>Login</Button>

            <div className="mt-3 text-center">
                <p>Don't have an account?</p>
                <Button variant="link" onClick={() => navigate('/register')}>Sign up now</Button>
            </div>
        </Form>
    )
}
