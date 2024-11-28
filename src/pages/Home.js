import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
       <div>
        <section className="hero-section text-center mb-4">
            <div classname="container px-3 py-3">
                <h1>Welcome to Fitness App</h1>
                <p className="lead">Register or Login now.</p>
                <Link to="/register" className="btn btn-primary btn-lg mx-1">Register</Link>
                <Link to="/login" className="btn btn-primary btn-lg mx-1">Login</Link>
            </div>
        </section>
       </div> 
    )
}