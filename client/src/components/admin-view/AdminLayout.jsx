import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar/Sidebar';
import AdminHeader from './AdminHeader/AHeader';
import './AdminLayout.css';

function AdminLayout() {
  return (
    <div className="admin-layout-container">
      <AdminSidebar />
      <div className="admin-content">
        <AdminHeader />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
