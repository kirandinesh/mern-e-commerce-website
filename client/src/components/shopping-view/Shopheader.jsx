import React, { useEffect, useState } from "react";
import "./css/Shopheader.css";
import Logo from "../../assets/logo/Logo";
import shoppingBagIcon from "../../assets/icons/shopping-bag.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import userIcon from "../../assets/icons/users-icon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "../../features/authSlice";
import CartSideBar from "./CartSideBar";
import { fetchCartItems } from "../../features/shop/cart-slice";

function Shopheader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigationListData = [
    { id: "home", label: "Home", path: "/shop/home" },
    { id: "shop", label: "Shop", path: "/shop/shoplist" },
    { id: "product", label: "Product", path: "#" },
    { id: "contactUs", label: "Contact Us", path: "/shop/contact" },
  ];

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleLogout = () => {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    // dispatch(logoutUser());
    navigate("/auth/login");
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);
  console.log(cartItems, "kiran");

  return (
    <header className="shopheader">
      <div className="logo">
        <Link to="/shop/home">
          <Logo />
        </Link>
      </div>
      <nav className="navigation-links">
        <ul className="nav-list">
          {navigationListData.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${
                location.pathname.includes(item.path) ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
      {isAuthenticated && (
        <div className="icon-group">
          <img
            src={searchIcon}
            alt="Search"
            className="icon"
            aria-label="Search"
            onClick={() => navigate("/shop/search")}
          />
          <div className="cartIcon-container">
            <img
              src={shoppingBagIcon}
              alt="Shopping Bag"
              className="carticon"
              aria-label="Shopping Bag"
              onClick={toggleCart}
            />
            <span className="cartitem">{cartItems?.items?.length || "0"}</span>
          </div>
          <div className="Avatar" onClick={() => navigate("/shop/account")}>
            <img
              src={userIcon}
              alt="User"
              className="icon"
              aria-label="User Account"
            />
          </div>
          <button className="shopLogout-btn" onClick={handleLogout}>
            Logout
            <LogOut size={20} />
          </button>
        </div>
      )}
      {isCartOpen && (
        <>
          <CartSideBar
            setIsCartOpen={setIsCartOpen}
            cartItems={
              cartItems && cartItems.items?.length > 0 ? cartItems.items : null
            }
            closeSidebar={() => setIsCartOpen(false)}
          />
        </>
      )}
    </header>
  );
}

export default Shopheader;
