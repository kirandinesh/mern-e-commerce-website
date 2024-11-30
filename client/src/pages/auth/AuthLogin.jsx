import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/auth/AuthLogin.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { toast } from "react-toastify";


function AuthLogin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(
        loginUser({ email: values.username, password: values.password })
      );
      if (data?.payload?.success) {
        toast.success(data?.payload?.message, toastOptions);
        navigate("/shop/home");
      } else {
        toast.error(data?.payload?.message, toastOptions);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", toastOptions);
    }
  };

  const handleInputs = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-login-container">
      <div className="form-title">
        <h4>Sign in</h4>
        <p>
          Don't have an account?{" "}
          <Link to="/auth/register">
            <span>Sign up</span>
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            required
            placeholder="Username or Email"
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={handleInputs}
          />
        </div>
        <div className="checkAgree">
          <div className="checkAgree-container">
            <input type="checkbox" name="remember" />
            <p>Remember me</p>
          </div>
          <div className="forget">
            <p>Forgot password?</p>
          </div>
        </div>
        <button type="submit" className="signInButton">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default AuthLogin;
