import React from "react";
import "./css/Footer.css";
import { Mail } from "lucide-react";
import footerImage from "../../assets/home-page/footerImage.png";
function Footer() {
  return (
    <div className="footer-header-container">
      <div className="footer-header-Imagecontainer">
        <img src={footerImage} alt="" />
      </div>
      <div className="footer-header">
        <h1>Join Our Newsletter</h1>
        <p>Sign up for deals, new products and promotions</p>
        <div className="email-container">
          <div className="email-logo">
            <Mail />
            <input type="email" placeholder="Email address" />
          </div>
          <button>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
