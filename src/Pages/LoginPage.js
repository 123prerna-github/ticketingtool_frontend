import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Login from '../Components/Login/Login';

const LoginPage = ({ onLogin }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleLogin = ({ username, password }) => {
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
    };

    return (
        <div className="login-page" >
            <h2>Hey! Welcome to the login page</h2>
            {isLoggedIn ? (
                <div>
                    <p>Welcome, {userData.username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                    <Navigate to="/ticket" /> 
                </div>
            ) : (
                <>
                    <Login onLogin={handleLogin} />
                    <div className="register-link">
                     Don't have an account? <Link to="/register">Register here</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginPage;
