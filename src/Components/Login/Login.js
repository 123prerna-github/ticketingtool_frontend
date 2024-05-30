import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/user.png';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const handleLogin = (userData) => {
        fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          Accept:"application.json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      })
      .then((res)=>res.json())
      .then((res2)=>{
        
        if(res2?.succsess){
          localStorage.setItem('token',res2?.accessToken);
          navigate("/ticket");
        }
        else{
            alert(res2.message);
        }  
      });
      onLogin(userData);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    // if (username.trim() === '' || password.trim() === '') {
    //     alert('Please enter username and password.');
    //     return;
    handleLogin({username, password});
    }
       

        // onLogin({ username, password });
        // setUsername('');
        // setPassword('');
    //};

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    User Name:
                    <img src={user_icon} alt=""/>
                    <input 
                    type="email" 
                    placeholder="Username"
                     value={username}
                      onChange={(e) => setUsername(e.target.value)}
                       required 
                       /> 
                </label>
                <label>
                    Password:
                    <img src={password_icon} alt=""/>
                    <input 
                    type="password"
                     placeholder="Password" 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} 
                     required 
                     />
                </label>
                <button className='button' type="submit">Login</button>

            </form>
        </div>
    );
};

export default Login;