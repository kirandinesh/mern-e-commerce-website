import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/auth/AuthRegister.css';
import { useDispatch } from "react-redux";
import { registerUser } from '../../features/authSlice';
import { toast } from 'react-toastify';

function AuthRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    userName: '',
    email: '',
    password: ''
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(values)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message, toastOptions);
        navigate('/auth/login');
      } else {
        toast.error(data?.payload?.message, toastOptions);
      }
    });
  };

  const handleInputs = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-register-container">
      <div className="form-title">
        <h4>Sign up</h4>
        <p>Already have an account? <Link to='/auth/login'><span>Sign in</span></Link></p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            required
            placeholder="Your Name"
            name="name"
            onChange={handleInputs}
            value={values.name}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            required
            placeholder="Username"
            name="userName"
            onChange={handleInputs}
            value={values.userName}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            required
            placeholder="Email address"
            name="email"
            onChange={handleInputs}
            value={values.email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            onChange={handleInputs}
            value={values.password}
          />
        </div>
        <div className="checkAgree">
          <input
            type="checkbox"
            name="checkbox"
            required
          />
          <p>I agree with <span>Privacy Policy</span> and <span>Terms of Use</span></p>
        </div>
        <button type="submit" className="signUpButton">Sign Up</button>
      </form>
    </div>
  );
}

export default AuthRegister;
