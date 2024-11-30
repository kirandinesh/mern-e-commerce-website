import React from "react";
import { Outlet } from "react-router-dom";
import "./AuthLayout.css";
import authPageImage from "../../assets/auth-page/auth-page-img.jpg";

function AuthLayout() {
  return (
    <div className="AuthLayout-Container">
      <div className="leftSide">
        <div className="image-container">
          <div className="logo">
            <h2>3legant.</h2>
          </div>
          <div className="image">
            <img src={authPageImage} alt="nj" />
          </div>
        </div>
      </div>
      <div className="rightSide">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
