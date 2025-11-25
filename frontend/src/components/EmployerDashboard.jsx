import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployerDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data));

    axios.get("http://localhost:5000/api/employer/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProfile(res.data));
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dash-layout">

      {/* SIDEBAR */}
      <div className="dash-sidebar">
        <h2 className="dash-logo">JobPortal</h2>

        <a className="side-link active">Dashboard</a>
       {user?.role === "Employer" && (
  <a href="/create-job" className="nav-btn">Post Job</a>
)}

        <a className="side-link">Manage Jobs</a>
        <a className="side-link">Applicants</a>

        <button className="logout-btn"
          onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="dash-main">

        <h1>Welcome, {profile?.companyName}</h1>
        <p className="dash-welcome">Manage your company recruiting activity</p>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <h3>Active Job Posts</h3>
            <p className="stat-number">3</p>
          </div>

          <div className="stat-card">
            <h3>Total Applicants</h3>
            <p className="stat-number">42</p>
          </div>

          <div className="stat-card">
            <h3>Interviews Scheduled</h3>
            <p className="stat-number">8</p>
          </div>
        </div>

        <h2 className="section-title">Recent Applicants</h2>

        <div className="job-list">
          <div className="job-card">
            <h3>Shivam Kumar — React Developer</h3>
            <p>Applied 2 days ago</p>
          </div>

          <div className="job-card">
            <h3>Meera Patel — UI/UX Designer</h3>
            <p>Applied yesterday</p>
          </div>

          <div className="job-card">
            <h3>Rohit Singh — Backend Engineer</h3>
            <p>Applied today</p>
          </div>
        </div>

      </div>

    </div>
  )
}
