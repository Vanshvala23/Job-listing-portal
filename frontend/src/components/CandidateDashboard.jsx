import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function CandidateDashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data));

    axios.get("http://localhost:5000/api/candidate/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));

  }, []);

  if (!user || !data) return <h2>Loading...</h2>;

  return (<>
  <Navbar/>
    <div className="dash-layout">

      {/* SIDEBAR */}
      <div className="dash-sidebar">
        <h2 className="dash-logo">JobVerse</h2>

        <a className="side-link active">Dashboard</a>
        <a className="side-link" href="/candidate/profile">Edit Profile</a>
        <a className="side-link" href="/candidate/applied">Applied Jobs</a>
        <a className="side-link" href="/candidate/saved">Saved Jobs</a>
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
        <p className="dash-welcome">Here’s what's happening with your job search</p>

        {/* STATS */}
        <div className="stats-row">

          <div className="stat-card">
            <h3>Profile Strength</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${data.profileStrength}%` }}></div>
            </div>
            <p>{data.profileStrength}% Completed</p>
          </div>

          <div className="stat-card">
            <h3>Applied Jobs</h3>
            <p className="stat-number">{data.appliedJobs}</p>
          </div>

          <div className="stat-card">
            <h3>Saved Jobs</h3>
            <p className="stat-number">
              {/* Dynamic saved jobs from backend */} 
              {data.savedJobs}
            </p>
          </div>
        </div>

        {/* RECOMMENDED JOBS */}
        <h2 className="section-title">Recommended Jobs</h2>

        <div className="job-list">
          {data.recommended.map(job => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company} • {job.location}</p>
              <a href={`/jobs/${job._id}`} className="view-btn">View</a>
            </div>
          ))}
        </div>

      </div>

    </div>
    </>
  );
}
