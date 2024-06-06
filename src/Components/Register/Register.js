import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Register.css';
import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.jpg';
import password_icon from '../Assets/password.png';

const Register = ({ onRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('');
    const navigate=useNavigate();

  const onRegisteruser=(userData)=>{                       
       fetch("http://localhost:3000/register",{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        Accept:"application.json",
        'Content-Type':'application/json'
      }
    })
    .then((res)=>res.json())
    .then((res2)=>{
     // alert(res2.message);
      if(res2?.success){
        navigate("/login");
      }
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // onRegisteruser({  firstName, lastName, email, password,role });
    onRegisteruser({  firstName, lastName, email, password });
  };

    return (
        <div className='login-container'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <img src={user_icon} alt=""/>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <img src={user_icon} alt=""/>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email Address:
                    <img src={email_icon} alt=""/>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                {/* <label>
          Role:
          <img className='img' src={user_icon} alt=""/>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </label> */}
                <button className='button' type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;