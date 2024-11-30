import React from "react";
import "./css/ShopFooter.css";
import { Facebook, Instagram, Youtube } from "lucide-react";
function ShopFooter() {
  const footerList = [
    { label: "Home" },
    { label: "Shop" },
    { label: "Product" },
    { label: "Blog" },
    { label: "Contact Us" },
  ];
  return (
    <div className="shop-footer-container">
      <div className="shop-footer-top">
        <div className="footer-left">
          <h2 className="footer-logo">3legant.</h2>
          <span>|</span>
          <h3>Gift & Decoration Store</h3>
        </div>
        <div className="footer-right">
          <ul className="footer-list">
            {footerList.map((footerItem, index) => (
              <li key={index}>{footerItem.label}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shop-footer-bottom">
        <div className="footer-left">
          <p className="copyright">
            Copyright © 2023 3legant. All rights reserved
          </p>
          <p className="privacy">Privacy Policy</p>
          <p className="term">Terms of Use</p>
        </div>
        <div className="footer-right">
          <Instagram />
          <Facebook />
          <Youtube />
        </div>
      </div>
    </div>
  );
}

export default ShopFooter;
