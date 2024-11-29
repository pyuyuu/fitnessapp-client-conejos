import React, { useState, useEffect} from 'react';
import UserContext, { UserProvider } from './UserContext';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Workouts from './pages/Workouts';
import Logout from './pages/Logout';
import './App.css';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.isAdmin !== undefined && decodedToken.email) {
          setUser({
            token,
            isAdmin: decodedToken.isAdmin,
            email: decodedToken.email,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  const unsetUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

    
  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
        <Toaster position="bottom-right" reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            padding: '20px 40px',
            fontSize: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
          }
        }} />
      </Router>
    </UserProvider>
  );
}

export default App;
