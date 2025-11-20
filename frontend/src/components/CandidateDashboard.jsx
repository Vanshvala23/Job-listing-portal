import { useEffect, useState } from "react";
import axios from "axios";

export default function CandidateDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data));

    axios.get("http://localhost:5000/api/candidate/me", {
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
        <a className="side-link" >Edit Profile</a>
        <a className="side-link">Applied Jobs</a>
        <a className="side-link">Saved Jobs</a>
        <a className="side-link">Settings</a>

        <button className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="dash-main">

        <h1>Hello, {user.name}</h1>
        <p className="dash-welcome">Here’s what's happening with your job search today</p>

        {/* STATS BOX */}
        <div className="stats-row">
          <div className="stat-card">
            <h3>Profile Strength</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "80%" }}></div>
            </div>
            <p>80% Completed</p>
          </div>

          <div className="stat-card">
            <h3>Applied Jobs</h3>
            <p className="stat-number">5</p>
          </div>

          <div className="stat-card">
            <h3>Job Matches</h3>
            <p className="stat-number">12</p>
          </div>
        </div>

        {/* RECOMMENDED JOBS */}
        <h2 className="section-title">Recommended Jobs</h2>
        <div className="job-list">

          <div className="job-card">
            <h3>Frontend Developer</h3>
            <p>Google • Bengaluru</p>
          </div>

          <div className="job-card">
            <h3>React Developer</h3>
            <p>Microsoft • Hyderabad</p>
          </div>

          <div className="job-card">
            <h3>Software Engineer</h3>
            <p>Amazon • Mumbai</p>
          </div>

        </div>

      </div>

    </div>
  );
}
