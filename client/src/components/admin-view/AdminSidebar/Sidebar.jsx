import React from "react";
import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  logoutUser,
  resetTokenAndCredentials,
} from "../../../features/authSlice";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    // dispatch(logoutUser());
    navigate("/auth/login");
  }

  return (
    <aside className="sidebar-container">
      <div className="sidebar-upper-container">
        <div className="sidebar-brand">
          <h4 onClick={() => navigate("/admin/dashboard")}>3legant.</h4>
        </div>
        <ul>
          {[
            {
              sidebarlistName: "Dashboard",
              id: "dashboard",
              path: "/admin/dashboard",
            },
            {
              sidebarlistName: "Products",
              id: "products",
              path: "/admin/products",
            },
            // {
            //   sidebarlistName: "Favorites",
            //   id: "favorites",
            //   path: "/admin/favorites",
            // },
            { sidebarlistName: "Inbox", id: "inbox", path: "/admin/inbox" },
            {
              sidebarlistName: "Order Lists",
              id: "order-list",
              path: "/admin/orderlist",
            },
            {
              sidebarlistName: "Product Stock",
              id: "productStocks",
              path: "/admin/stocks",
            },
          ].map((value) => (
            <li key={value.id} onClick={() => navigate(value.path)}>
              <div
                className={`sidebar-button ${
                  location.pathname.includes(value.path) ? "active" : ""
                }`}
              >
                <div className="icon"></div>
                <div className="title">{value.sidebarlistName}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-lower-container">
        <ul>
          <li onClick={() => navigate("/admin/settings")}>
            <div
              className={`sidebar-button ${
                location.pathname === "/admin/settings" ? "active" : ""
              }`}
            >
              <div className="icon"></div>
              <div className="title">Settings</div>
            </div>
          </li>

          <li onClick={handleLogout}>
            <div className="sidebar-Logoutbutton">
              <div className="icon"></div>
              <div className="title">Logout</div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default AdminSidebar;
