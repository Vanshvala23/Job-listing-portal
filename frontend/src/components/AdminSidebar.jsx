import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/admin-login";
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-brand">Admin Panel</h2>

      <nav>
        <Link to="/admin" className="admin-link">Dashboard</Link>
        <Link to="/admin/users" className="admin-link">Manage Users</Link>

        <button className="admin-logout" onClick={logout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}
