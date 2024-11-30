import React from "react";
import "./AHeader.css";
import { Search } from "lucide-react";
import { CircleChevronDown } from "lucide-react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
function AdminHeader() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="admin-header">
      <div className="header-left">
        <div className="header-searchBar">
          <Search size={15} strokeWidth={0.5} color="black" />
          <input type="search" name="search" placeholder="Search" />
        </div>
      </div>

      <div className="header-right">
        <div className="admin-profile-container">
          <div className="hero">
            <Avatar />
          </div>
          <div className="hero-details">
            <div className="hero-name">
              {user?.userName.charAt(0).toUpperCase() + user?.userName.slice(1)}
            </div>
            <div className="hero-role">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </div>
          </div>
          <div className="more-settings">
            <CircleChevronDown size={18} strokeWidth={0.5} color="#5C5C5C" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
