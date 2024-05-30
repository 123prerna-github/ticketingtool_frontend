import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../Components/Register/Register';

const RegisterPage = () => {
    const handleRegister = (newUser) => {
        console.log('New user registered:', newUser);
    };

    return (
        <div>
            <h1>Register for My App</h1>
            <Register onRegister={handleRegister} />
            <div>
                Already have an account? <Link to="/">Login here</Link>
            </div>
        </div>
    );
};

export default RegisterPage;