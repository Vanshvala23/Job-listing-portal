import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, employers: 0, candidates: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    }).then(res => setStats(res.data));
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Dashboard" />

        <div className="admin-cards">
          <div className="admin-card">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
          <div className="admin-card">
            <h3>Employers</h3>
            <p>{stats.employers}</p>
          </div>
          <div className="admin-card">
            <h3>Candidates</h3>
            <p>{stats.candidates}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
